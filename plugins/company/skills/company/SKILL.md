---
name: company
description: >
  Codexで秘書から始める仮想組織を構築・運営する。
  `/company`、秘書、TODO、壁打ち、相談、メモ、仮想組織、部署管理の依頼で使う。
---

# Company for Codex

## いつ使うか

- ユーザーが `/company` と入力したとき
- ユーザーが秘書、TODO管理、壁打ち、相談、メモ、仮想組織、部署管理を依頼したとき
- `.company/` 配下の組織ファイルを運営・整理・移行するとき

## Codex向けの前提

- ClaudeCode の slash command は Codex では通常の入力テキストとして扱う。`/company` と言われたらこのスキルを起動したものとして進める。
- ClaudeCode の `CLAUDE.md` ではなく、Codex で読みやすい `AGENTS.md` を生成・参照する。
- インタラクティブな質問は、Codex の通常の会話で簡潔に行う。必要情報がユーザー入力から十分に分かる場合は追加質問せず進める。
- ファイル作成・更新前には現在日付を確認する。
- 既存ファイルは上書きしない。追記、差分更新、またはバックアップを残す。

## ワークフロー

### Step 1: 検出とモード判定

対象ディレクトリの `.company/` を確認する。

- `.company/AGENTS.md` が存在する場合: それを読み込み、運営モードへ進む。
- `.company/CLAUDE.md` が存在し、`.company/AGENTS.md` が存在しない場合: ClaudeCode版の既存組織として検出し、Codex移行を提案する。
- `.company/ceo/` が存在する場合: v1組織として検出し、v2移行を提案する。
- `.company/` が存在しない場合: オンボーディングへ進む。

### Step 2: オンボーディング

不足している情報だけを質問する。質問は最大3つに収める。

1. 事業・活動: ユーザーが取り組んでいる活動や事業。
2. 目標・困りごと: 今の目標、課題、整理したいこと。
3. ダッシュボード案内の要否: ブラウザで可視化したいか。元プロジェクトの `npx cc-company-dashboard` は任意案内に留める。

例:

```text
はじめまして。あなたの秘書として動きます。
まず、事業や活動と、今の目標・困りごとを教えてください。
```

### Step 3: 初期組織を作成

ヒアリング結果をもとに、カレントディレクトリに次の構造を作る。

```text
.company/
├── AGENTS.md
└── secretary/
    ├── AGENTS.md
    ├── inbox/
    ├── todos/
    │   └── YYYY-MM-DD.md
    └── notes/
```

生成手順:

1. `references/agents-md-template.md` を使って `.company/AGENTS.md` を生成する。
2. `references/departments.md` の `secretary/AGENTS.md` テンプレートを使って `.company/secretary/AGENTS.md` を生成する。
3. `secretary/inbox/`, `secretary/todos/`, `secretary/notes/` を作成する。
4. 今日の日付で `secretary/todos/YYYY-MM-DD.md` を作成する。同じ日付のファイルがある場合は追記する。
5. 作成したパスと次にできることを簡潔に報告する。

## ClaudeCode版からの移行

`.company/CLAUDE.md` または部署配下の `CLAUDE.md` を検出した場合:

1. 既存ファイルを削除しない。
2. `.company/AGENTS.md` がなければ、既存の `CLAUDE.md` の内容を読み取り、Codex向けの表現に置換して `AGENTS.md` を生成する。
3. 部署配下も同様に、`CLAUDE.md` を残したまま `AGENTS.md` を生成する。
4. `ceo/` と `reviews/` がある古い構成では、ユーザー承認後に秘書室中心のv2構成へ整理する。削除が必要な場合は、削除対象を明示して承認を取る。

置換方針:

- `CLAUDE.md` → `AGENTS.md`
- ClaudeCode固有のコマンドやツール名 → Codexの通常対話・利用可能なMCP/プラグイン
- `/company` の実行という表現 → Company skill の利用

## 運営モード

`.company/AGENTS.md` を最初に読み込んでから応答する。秘書が常に窓口になり、ユーザーは部署を意識しなくてよい。

秘書が直接対応するもの:

| パターン | 対応 |
| --- | --- |
| TODO・タスク | `secretary/todos/YYYY-MM-DD.md` に追記・表示 |
| 壁打ち・相談 | 対話で深掘りし、まとまったら `secretary/notes/` に保存 |
| メモ・アイデア | `secretary/inbox/YYYY-MM-DD.md` に時刻付きで記録 |
| 今日やること | 今日のTODOファイルを読み、未完了を整理 |
| ダッシュボード | テキストで概要を表示し、必要なら `npx cc-company-dashboard` を案内 |

部署が必要なもの:

1. 該当部署が存在する場合は、その部署の `AGENTS.md` を読み、ルールに従って作業する。
2. 該当部署が存在しない場合は、まず `secretary/notes/` に結果を保存する。
3. 同じ領域の依頼が2回以上続いたら、部署作成を提案する。

## 部署の追加

ユーザーが明示的に依頼した場合、または同じ領域の依頼が繰り返された場合に部署作成を提案する。

部署候補:

| 部署 | フォルダ | 担当 |
| --- | --- | --- |
| PM | `pm` | プロジェクト進捗、マイルストーン、チケット管理 |
| リサーチ | `research` | 市場調査、競合分析、技術調査 |
| マーケティング | `marketing` | コンテンツ企画、SNS、キャンペーン |
| 開発 | `engineering` | 技術ドキュメント、設計、デバッグ |
| 経理 | `finance` | 請求書、経費、売上管理 |
| 営業 | `sales` | クライアント管理、提案書 |
| クリエイティブ | `creative` | デザインブリーフ、ブランド管理 |
| 人事 | `hr` | 採用管理、オンボーディング |

作成時は `references/departments.md` から該当部署の `AGENTS.md` とフォルダ構成を使い、`.company/AGENTS.md` の組織構成と部署一覧も更新する。

## MCP・外部サービス連携

ユーザーがカレンダー、Notion、GitHub、Slackなどの連携を求めた場合:

- 現在利用可能なCodexのMCPツールやプラグインを優先する。
- 未導入の連携が必要な場合は、導入できるCodexプラグイン・コネクタがあれば案内する。
- 連携がなくても `.company/` 内のファイル管理だけで運営できる。

## 運用ルール

- 意思決定、学び、アイデアは必要に応じて記録する。
- 意思決定は `secretary/notes/YYYY-MM-DD-decisions.md` に残す。
- 学びは `secretary/notes/YYYY-MM-DD-learnings.md` に残す。
- アイデアや未整理メモは `secretary/inbox/YYYY-MM-DD.md` に残す。
- 同じ日付のファイルがすでにある場合は追記する。
- 日次ファイルは `YYYY-MM-DD.md`、トピックファイルは `kebab-case.md` にする。
- 部署間連携が発生した場合は、各部署のファイルに相互参照を記載する。
- 個人情報や機微情報は必要最小限だけ記録し、公開リポジトリでは扱いに注意する。

## ファイル参照

- 組織ルール生成テンプレート: `references/agents-md-template.md`
- 部署別テンプレート: `references/departments.md`
