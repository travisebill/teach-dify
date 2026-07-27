# Mission: Dify AI 客服系統

> Stateful teaching mission. Update with care — confirm with user before changing scope.
> Captured 2026-07-15 12:57 (Asia/Taipei) by Ryo ⚙️🐱

## ⚡ Session Recovery（給新 session 的 Ryo 看）

如果你是被 user 提到 `teach-dify` / `lesson 000X` / `done 000X` 才進來的新 session：

1. **你正在讀這份 MISSION.md** —— mission = **單租戶 AI 客服 + 多租戶 SaaS**（不是 generic Dify 教學）
2. 讀 `learning-records/` 找最新狀態（編號最大 = 當前進度）
3. 讀最新 `lessons/000N-*.html` 知道當前 win + 先決條件
4. **不要**用 generic「陪你跑 SOP / 你想讓我幫忙設計架構」接住 user — 會被主人教訓

**Lesson 回報標準格式**：`done 000X` + 截圖 / 對話 log；卡住貼「預期 vs 實際」對照。

詳細 protocol 在 `~/.openclaw/workspace/agents/ryo/AGENTS.md` 的「🔁 Stateful Mission 恢復 Protocol」section。

---

## 🎯 Why（為什麼想學）

- 你想做 **AI 客服系統**——把 Dify 當核心 LLM app 平台
- 終極目標：可服務**多個客戶 / 多個產品線**（多租戶 SaaS 雛形）
- 涵蓋全類型：**Chatbot（FAQ）+ RAG（文件問答）+ Agent-workflow（工單轉真人 / 查後台 API）+ 多租戶後台管理**

## 👤 Background

- **Dify 經驗**：稍微使用過（基本 UI 看過）
- **LLM 程式庫經驗**：沒用過 LangChain / LlamaIndex
- **寫 code**：用 **Copilot CLI / Codex** —— 不怕 code-heavy lesson
- **Python**：後端工程師（FastAPI / Reflex）

## ⏱ Timeline

| 階段 | 時間 | 目標 |
|------|------|------|
| **密集期** | 4 週（by 2026-08-15） | 單租戶 AI 客服上線 demo + 後端整合 |
| **side project** | 之後（無限期） | 多租戶 SaaS + 整合真實 API + 上雲 |
| **不做** | 全程 | 從零自建 LLM 框架（已有 Dify 平台） |

## ✅ Definition of Done（密集期結束時可做到）

- [ ] Docker 跑起 Dify，能開 workspace + 設 provider + 寫第一個 chatbot
- [ ] 把自家公司文件做成 RAG knowledge base
- [ ] Workflow / Agent 處理「工單轉真人客服」流程（human handoff）
- [ ] 寫一支 FastAPI 呼叫 Dify `/chat-messages` endpoint，能整合既有專案
- [ ] **單租戶** demo 完成（給一個客戶、一個產品線用）
- [ ] 至少 3 個 production-quality 客服對話樣本（含 handoff）

## 🚫 Out of Scope（這份 mission 不做）

- **不從零自建 LLM 框架**（Dify 是平台，這是「用好 Dify」而不是「重造 Dify」）
- 不比較 LangChain / LlamaIndex 底層
- 不 audit Dify source code / 不貢獻 PR
- 不上架 Dify plugin marketplace
- 不重新學 FastAPI / Python basics（你會）

## 🎓 Teaching Approach（teach skill 原則應用）

- **起點中段**：你已會 Dify UI + Python，所以 lesson 1 不是 LLM 101 也不是 API 101——直接從「**第一個能回答自家 FAQ 的 chatbot**」切入
- **每個 lesson 一個 concrete win**（teach skill 硬規則）
- **code-heavy 沒問題**：你是 Copilot CLI / Codex user
- **Dify 的 code-extension 機制**（code node / tool node / external API）會比一般教學多花時間（你身為 backend engineer 的強項）

## 📂 Workspace Structure

```
~/.openclaw/workspace/teach-dify/
├── MISSION.md          # 這份
├── NOTES.md            # scratchpad（禮士偏好 + Ryo 工作筆記）
├── RESOURCES.md        # Dify 官方文件 + 推薦讀物
├── lessons/            # Tufte 風格 HTML，每 lesson 一個 win
├── reference/          # cheat sheet + glossary
├── learning-records/   # 禮士學到了什麼
└── assets/             # 共用 stylesheet + quiz widget
```

## 📝 Notes

- 主人偏好：不要廢話、有結論直接推進、Tufte 風格 lesson
- 「由淺至深」—— first lesson 仍搭環境 + 第一個 chatbot（最淺），但 lesson 2+ 跳很快
- 時區 Asia/Taipei
- **部署偏好 TBD**（self-host Docker / Cloud / 純讀架構）——Lesson 1 開始時需確認，預設是本地 Docker self-host
