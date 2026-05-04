# codex-company

ClaudeCode plugin [Shin-sibainu/cc-company](https://github.com/Shin-sibainu/cc-company) を Codex Marketplace Plugin として動くように移植したリポジトリです。

## Plugin

- Marketplace: [.agents/plugins/marketplace.json](/Users/t-hotta/Github/hottomo-private/codex-company/.agents/plugins/marketplace.json)
- Plugin manifest: [plugins/company/.codex-plugin/plugin.json](/Users/t-hotta/Github/hottomo-private/codex-company/plugins/company/.codex-plugin/plugin.json)
- Skill: [plugins/company/skills/company/SKILL.md](/Users/t-hotta/Github/hottomo-private/codex-company/plugins/company/skills/company/SKILL.md)

## Codex での主な変更点

- ClaudeCode の `.claude-plugin/plugin.json` を `.codex-plugin/plugin.json` に変換
- ClaudeCode の marketplace 定義を Codex の `.agents/plugins/marketplace.json` に変換
- `/company` slash command 前提を Codex skill の自然言語トリガーに変換
- `CLAUDE.md` 生成を `AGENTS.md` 生成に変換
- `AskUserQuestion` 前提を Codex の通常の対話フローに変換

## Validation

```bash
npm test
```
