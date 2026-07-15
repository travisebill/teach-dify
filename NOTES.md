# NOTES.md — Ryo's scratchpad

> Working notes for the Dify teaching mission.
> Update freely; this is not a deliverable.

---

## 主人偏好（teach-vlog MISSION 抄過來）

- 不要廢話、有結論直接推進
- Tufte 風格 lesson
- 「由淺至深」，但 lesson 1 不拖基礎觀念
- Telegram rich text OK（markdown）
- 時區 Asia/Taipei
- 寫 code 會用 Copilot CLI / Codex → code-heavy lesson 沒問題

---

## Ryo 工作筆記

### 2026-07-15 12:57 — Session 0
- Mission 確立：AI 客服系統 + 多租戶 SaaS 雛形
- Timeline 1 個月密集（by 2026-08-15）→ 之後 side project
- 部署偏好 TBD → Lesson 1 開始時確認（預設本地 Docker self-host）
- 預備 lesson roadmap：
  - 0001 搭環境（Docker self-host）+ 第一個 chatbot（30-45 min）
  - 0002 RAG：把自家 FAQ / 產品文件做成 knowledge base
  - 0003 Workflow / Agent：human handoff + 工具呼叫
  - 0004 Code Node + External API Tool：後端整合
  - 0005 Backend Integration：FastAPI + Dify `/chat-messages`
  - 0006 Multi-tenant SaaS：workspaces / members / API limits / 模型 routing
  - 0007-8 Production polish：monitoring / observability / 反饋學習 / handoff 平滑

### 2026-07-15 13:00 — Session 0 完成

抓完 llms.txt (200+ 頁索引) + 3 個關鍵頁 (quick-start / docker-compose / workflow-101/lesson-01)，發現：

1. **官方有 `Customer Service Bot with Knowledge Base` tutorial** — 一字不差對應主人 mission，Lesson 2 主線
2. **官方有 `Workflow 101` 10-lesson 課程** — 從 Workflow 概念到 Publish/監控，可穿插當速成教材
3. **官方 `quick-start` 是 Multi-platform Content Generator**（9 nodes 串接）— 太進階，跳過，用 `Simple Chatbot` (Hello World) 替代 Lesson 0 練習
4. **App type 有 5 種**：Chatbot / Text Generator / Agent / New Agent / Workflow+Chatflow——AI 客服會用到 Chatbot + Workflow + Chatflow + (選) Agent

```
~/.openclaw/workspace/teach-dify/
├── .git/                                  # session 0 commit done
├── MISSION.md                             # ✅
├── NOTES.md                               # ✅（這份）
├── RESOURCES.md                           # ✅ 80+ URL / 11 類
├── assets/style.css                       # ✅ Tufte 樣式表
├── lessons/                               # 空（待 Lesson 1 確認 scope 後寫）
├── reference/                             # 空
└── learning-records/                      # 空
```

## Lesson roadmap（待主人確認 Lesson 1 scope）

| # | 主題 | 時間 | 主用資源 |
|---|---|---|---|
| 0001 | Self-host Docker Compose + 第一個 Chatbot (Hello World) | 60-90 min | Section A + B (Simple Chatbot) |
| 0002 | RAG: 第一個 Customer Service Bot w/ KB | 90 min | B (Customer Service Bot ⭐) + E |
| 0003 | Workflow + Human Input (handoff to human) | 90 min | B.1 (lesson 04-05) + D (Human Input) |
| 0004 | HTTP Request + Tool (call 後台 API) | 60 min | B.1 (lesson 07) + D (HTTP/Tool) |
| 0005 | Code node + 自訂邏輯 (Python) | 60 min | D (Code) |
| 0006 | 後端整合：FastAPI + `/chat-messages` | 90 min | F (API) |
| 0007 | 多租戶 SaaS (workspace / members / token) | 60 min | G |
| 0008 | Observability (logs / Langfuse / 反饋) | 60 min | H |

總計 8 lessons × ~75 min = ~10 小時核心內容，4 週每週 2 lesson。

## 待辦（更新）

- [x] 設計 Lesson 0001 HTML（已 commit `781106e` + `e62811e`，Lines 1 自架 + 第一個 Chatbot）
- [x] Self-host Docker（主人已驗證 done 0001）
- [x] 設計 Lesson 0002 HTML（Customer Service Bot w/ KB）—— 已寫 13.4 KB / ~280 行；待 commit + push
- [x] 把 Dify concepts glossary 抽出來放 reference/GLOSSARY.md
- [x] 確認主人 deployment 偏好（Docker self-host 已驗證 done 0001）
- [x] 取回 Lesson 2 primary source `docs.dify.ai/en/learn/tutorials/customer-service-bot` 內容確認（cached at `/tmp/dify-customer-sop/customer-service-bot.md`）
- [x] 把 Lesson 1 done 經驗寫進 `learning-records/0001-...md`（已寫）
- [x] 存主人給的真實 FAQ 檔（`reference/gas-company-faq.md`，20 條 Q&A，5 大類，台灣天然氣）
- [ ] 寫 `learning-records/0002-...md` 等主人 done 0002 再記錄

### 2026-07-15 21:58 — Lesson 0001 done

- User 回報 `done 0001` + 截圖（Hello Dify Chatbot 在 WebApp 對話正常）
- 自我評估 6 項 checklist 全 OK：docker compose healthy / admin / provider / chatbot / publish / webapp 對話
- 截圖額外訊號：User 問「Dify 版本」「升級 Dify」— AI 答「無法讀 host 環境，建議查 docker-compose.yml」「給 4-step Docker upgrade recipe」。顯示：(a) Chatbot 沒 host 環境 access（合理，需後續 Lesson 4-6 解）、(b) AI 對 generic devops 問答還 ok、(c) User 對生產 deployment 流程有興趣
- Lesson 2 規劃準備：需 User 提供 FAQ 檔 + 選 embedding provider

## Lesson 1 scope 提案（給主人二選一）

**方案 A**（漸進）：Lesson 1 = Self-host Docker + 第一個 Simple Chatbot (Hello World)。Lesson 2 = Customer Service Bot tutorial。
**方案 B**（合併）：Lesson 1 = Self-host Docker + 直接做 Customer Service Bot tutorial。1 個 lesson 解決 0→1 win。

方案 B 對「由淺至深」違反一點，但主人已 slightly used Dify，跳過 Hello World 直接走 mission-aligned tutorial 可能更舒服。
---

## 已知材料（待主人提供）

- 自家公司 FAQ 文件
- 產品規格 / 說明書
- 既有客服對話樣本（用於 lesson 3+ handoff 設計）

---

## 教學互動備註

- 每個 lesson 後主人會答 quiz / 回饋 → 寫進 `learning-records/000N-xxx.md`
- 不要在 lesson HTML 內 inline 大段 code——拆出去到 `assets/` components
- 主人問觀念問題 → 先打 `docs.dify.ai/...` 確認再回答，不要靠 parametric knowledge（teach skill 硬規則）
