import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const PLUGIN_DIR = resolve(ROOT, 'plugins/company');
const SKILL_DIR = resolve(PLUGIN_DIR, 'skills/company');

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function readText(path) {
  return readFileSync(path, 'utf8');
}

function parseFrontMatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert.ok(match, 'front matter is missing');

  const attributes = {};
  for (const line of match[1].split('\n')) {
    const field = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (field) {
      attributes[field[1]] = field[2].trim();
    }
  }
  return attributes;
}

test('Codex marketplace manifest exists and points at company plugin', () => {
  const path = resolve(ROOT, '.agents/plugins/marketplace.json');
  assert.equal(existsSync(path), true);

  const marketplace = readJson(path);
  assert.equal(marketplace.name, 'codex-company');
  assert.equal(marketplace.interface.displayName, 'Codex Company');

  const entry = marketplace.plugins.find((plugin) => plugin.name === 'company');
  assert.ok(entry);
  assert.deepEqual(entry.source, {
    source: 'local',
    path: './plugins/company',
  });
  assert.equal(entry.policy.installation, 'AVAILABLE');
  assert.equal(entry.policy.authentication, 'ON_INSTALL');
  assert.equal(entry.category, 'Productivity');
});

test('Codex plugin manifest is complete enough for Marketplace discovery', () => {
  const path = resolve(PLUGIN_DIR, '.codex-plugin/plugin.json');
  assert.equal(existsSync(path), true);

  const plugin = readJson(path);
  assert.equal(plugin.name, 'company');
  assert.match(plugin.version, /^\d+\.\d+\.\d+/);
  assert.equal(plugin.license, 'MIT');
  assert.equal(plugin.skills, './skills/');
  assert.equal(plugin.interface.displayName, 'Company');
  assert.equal(plugin.interface.category, 'Productivity');
  assert.ok(plugin.interface.capabilities.includes('Interactive'));
  assert.ok(plugin.interface.capabilities.includes('Write'));
});

test('company skill uses Codex conventions', () => {
  const path = resolve(SKILL_DIR, 'SKILL.md');
  assert.equal(existsSync(path), true);

  const content = readText(path);
  const frontMatter = parseFrontMatter(content);
  assert.equal(frontMatter.name, 'company');
  assert.ok(content.includes('## Codex向けの前提'));
  assert.ok(content.includes('.company/AGENTS.md'));
  assert.ok(content.includes('references/agents-md-template.md'));
  assert.ok(content.includes('references/departments.md'));
  assert.equal(content.includes('AskUserQuestion'), false);
  assert.equal(content.includes('.claude-plugin'), false);
});

test('reference templates cover all default departments with AGENTS.md sections', () => {
  const path = resolve(SKILL_DIR, 'references/departments.md');
  assert.equal(existsSync(path), true);

  const content = readText(path);
  for (const department of [
    '秘書室',
    'PM',
    'リサーチ',
    'マーケティング',
    '開発',
    '経理',
    '営業',
    'クリエイティブ',
    '人事',
  ]) {
    assert.ok(content.includes(department), `${department} is missing`);
  }

  for (const section of [
    'secretary/AGENTS.md',
    'pm/AGENTS.md',
    'research/AGENTS.md',
    'marketing/AGENTS.md',
    'engineering/AGENTS.md',
    'finance/AGENTS.md',
    'sales/AGENTS.md',
    'creative/AGENTS.md',
    'hr/AGENTS.md',
  ]) {
    assert.ok(content.includes(section), `${section} is missing`);
  }
});

test('organization AGENTS.md template documents all required variables', () => {
  const path = resolve(SKILL_DIR, 'references/agents-md-template.md');
  assert.equal(existsSync(path), true);

  const content = readText(path);
  for (const variable of [
    '{{BUSINESS_TYPE}}',
    '{{GOALS_AND_CHALLENGES}}',
    '{{CREATED_DATE}}',
    '{{ADDITIONAL_DEPARTMENTS}}',
    '{{DEPARTMENT_TABLE_ROWS}}',
    '{{PERSONALIZATION_NOTES}}',
  ]) {
    assert.ok(content.includes(variable), `${variable} is missing`);
  }

  assert.ok(content.includes('## 運営ルール'));
  assert.ok(content.includes('.company/AGENTS.md'));
});
