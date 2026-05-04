# Company Codex Plugin

This plugin is a Codex Marketplace Plugin port of [Shin-sibainu/cc-company](https://github.com/Shin-sibainu/cc-company).

It provides the `company` skill, which sets up and operates a file-based virtual organization starting with a secretary department.

## Codex behavior

- The user can invoke it with `/company` or by asking for secretary, TODO, consultation, or virtual company management.
- The skill creates `.company/AGENTS.md` and department-level `AGENTS.md` files.
- Existing ClaudeCode `.company/CLAUDE.md` files are preserved and can be migrated into Codex `AGENTS.md` files.

## Source

The original ClaudeCode plugin is MIT licensed. See [LICENSE](./LICENSE).
