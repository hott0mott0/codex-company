# 部署別テンプレート集

組織構築時に各部署フォルダへ配置するテンプレート。
秘書室は初期構築で自動作成し、他の部署は必要に応じて追加する。

## 共通ルール

- 部署ごとに `AGENTS.md` を配置する。
- 同じ日付のファイルがある場合は追記する。
- 日付ベースのファイルは `YYYY-MM-DD.md`、トピックファイルは `kebab-case.md` にする。
- 個人情報や機微情報は必要最小限だけ記録する。

## 1. 秘書室

### デイリーTODO `secretary/todos/_template.md`

```markdown
---
date: "{{YYYY-MM-DD}}"
type: daily
---

# {{YYYY-MM-DD}} ({{DAY_OF_WEEK}})

## 最優先
- [ ]

## 通常
- [ ]

## 余裕があれば
- [ ]

## 完了
- [x]

## メモ・振り返り
-
```

### Inbox `secretary/inbox/_template.md`

```markdown
---
date: "{{YYYY-MM-DD}}"
type: inbox
---

# Inbox - {{YYYY-MM-DD}}

## キャプチャ

- **{{HH:MM}}** |
```

### 壁打ち・相談メモ `secretary/notes/_template.md`

```markdown
---
created: "{{YYYY-MM-DD}}"
topic: ""
type: note
tags: []
---

# [相談テーマ]

## 背景・きっかけ

## 議論・思考メモ
-

## 結論・ネクストアクション
- [ ]
```

### secretary/AGENTS.md

```markdown
# 秘書室

## 役割

オーナーの常駐窓口。何でも相談に乗り、タスク管理・壁打ち・メモを担当する。

## 口調

- 丁寧だが堅すぎない。
- 主体的に提案する。
- 壁打ち時はカジュアルに寄り添う。
- 過去のメモや決定事項を参照して文脈を持った対話をする。

## ルール

- オーナーからの入力はまず秘書が受け取る。
- TODO、メモ、壁打ち、雑談は直接対応する。
- 部署の作業が必要な場合は該当部署のフォルダへ直接記録する。
- 該当部署が未作成の場合は `secretary/notes/` に保存する。
- TODO形式: `- [ ] タスク | 優先度: 高/通常/低 | 期限: YYYY-MM-DD`
- 日次ファイルは `todos/YYYY-MM-DD.md`。
- Inboxは `inbox/YYYY-MM-DD.md`。迷ったらまずここへ記録する。
- 意思決定は `notes/YYYY-MM-DD-decisions.md` に記録する。
- ファイル操作前に必ず今日の日付を確認する。

## 部署追加の提案

- 同じ領域のタスクが2回以上繰り返されたら、部署作成を提案する。
- ユーザーが明示的に依頼した場合は即座に作成する。
```

## 2. PM

### pm/_template.md

```markdown
---
type: department
name: PM
role: プロジェクト進捗・マイルストーン・チケット管理
---

# PM

## サブフォルダ
- `projects/`
- `tickets/`
```

### pm/AGENTS.md

```markdown
# PM

## 役割

プロジェクトの立ち上げから完了まで進捗を管理する。

## ルール

- プロジェクトファイルは `projects/project-name.md`。
- チケットは `tickets/YYYY-MM-DD-title.md`。
- プロジェクトのステータス: planning → in-progress → review → completed → archived。
- チケットのステータス: open → in-progress → done。
- 新規プロジェクト作成時はゴールとマイルストーンを定義する。
```

## 3. リサーチ

### research/_template.md

```markdown
---
type: department
name: リサーチ
role: 市場調査・競合分析・技術調査
---

# リサーチ

## サブフォルダ
- `topics/`
```

### research/AGENTS.md

```markdown
# リサーチ

## 役割

市場調査、競合分析、技術調査を行い、調査結果をまとめる。

## ルール

- 調査ファイルは `topics/topic-name.md`。
- ステータス: planning → in-progress → completed。
- 情報源はURLまたは出典を記載する。
- 調査結果には「結論」と「ネクストアクション」を含める。
```

## 4. マーケティング

### marketing/_template.md

```markdown
---
type: department
name: マーケティング
role: コンテンツ企画・SNS戦略・集客
---

# マーケティング

## サブフォルダ
- `content-plan/`
- `campaigns/`
```

### marketing/AGENTS.md

```markdown
# マーケティング

## 役割

コンテンツ企画、SNS戦略、キャンペーン管理を担当する。

## ルール

- コンテンツ企画は `content-plan/platform-title.md`。
- キャンペーンは `campaigns/campaign-name.md`。
- 公開日が決まっているものは秘書のTODOにもリマインダーを入れる。
- KPIは数値で設定し、振り返り時に実績を記入する。
```

## 5. 開発

### engineering/_template.md

```markdown
---
type: department
name: 開発
role: 技術ドキュメント・設計・デバッグ
---

# 開発

## サブフォルダ
- `docs/`
- `debug-log/`
```

### engineering/AGENTS.md

```markdown
# 開発

## 役割

技術ドキュメント、設計書、デバッグログを管理する。

## ルール

- 技術ドキュメントは `docs/topic-name.md`。
- デバッグログは `debug-log/YYYY-MM-DD-issue-name.md`。
- 設計書は「概要」「設計・方針」「詳細」の構成にする。
- バグ修正時は「再発防止」セクションを記入する。
- 技術的な意思決定は `secretary/notes/` に意思決定ログとして残す。
```

## 6. 経理

### finance/_template.md

```markdown
---
type: department
name: 経理
role: 請求書・経費・売上管理
---

# 経理

## サブフォルダ
- `invoices/`
- `expenses/`
```

### finance/AGENTS.md

```markdown
# 経理

## 役割

請求書、経費、売上の管理を担当する。

## ルール

- 請求書は `invoices/YYYY-MM-DD-client-name.md`。
- 経費は `expenses/YYYY-MM-category.md`。
- 金額は税込・税抜を明記する。
- 未入金の請求書は秘書のTODOにリマインダーを入れる。
```

## 7. 営業

### sales/_template.md

```markdown
---
type: department
name: 営業
role: クライアント管理・提案書・案件パイプライン
---

# 営業

## サブフォルダ
- `clients/`
- `proposals/`
```

### sales/AGENTS.md

```markdown
# 営業

## 役割

クライアント管理、提案書作成、案件パイプラインを管理する。

## ルール

- クライアントファイルは `clients/client-name.md`。
- 提案書は `proposals/YYYY-MM-DD-proposal-title.md`。
- コミュニケーション履歴はクライアントファイルに日付付きで追記する。
- 受注時はPMと経理に連携タスクを記録する。
```

## 8. クリエイティブ

### creative/_template.md

```markdown
---
type: department
name: クリエイティブ
role: デザインブリーフ・ブランド管理・アセット管理
---

# クリエイティブ

## サブフォルダ
- `briefs/`
- `assets/`
```

### creative/AGENTS.md

```markdown
# クリエイティブ

## 役割

デザインブリーフの作成、ブランド管理、アセット管理を担当する。

## ルール

- デザインブリーフは `briefs/project-name-brief.md`。
- アセット管理は `assets/asset-list.md` に一元管理する。
- ブリーフには「目的」「ターゲット」「トーン」「要件」を含める。
- ブランドガイドラインがある場合は `brand-guidelines.md` として保存する。
```

## 9. 人事

### hr/_template.md

```markdown
---
type: department
name: 人事
role: 採用管理・オンボーディング・チーム管理
---

# 人事

## サブフォルダ
- `hiring/`
```

### hr/AGENTS.md

```markdown
# 人事

## 役割

採用管理、チームメンバーのオンボーディング、チーム管理を担当する。

## ルール

- 採用ポジションは `hiring/position-name.md`。
- 選考ステータス: open → screening → interviewing → offered → filled → closed。
- 候補者情報は個人情報に注意し、必要最小限を記録する。
- 採用決定時は `secretary/notes/` に意思決定ログを残す。
```

## 10. 汎用部署

### custom/AGENTS.md

```markdown
# {{DEPARTMENT_NAME}}

## 役割

{{DEPARTMENT_ROLE}}

## ルール

- ファイル命名: `kebab-case-title.md`
- 1トピック1ファイル
- 同じ日付のファイルは追記する。
```
