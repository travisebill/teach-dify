# 0001: Lesson 0001（Self-host + 第一個 Hello World Chatbot）完成

User 完成 docker self-host Dify + publish `Hello Dify` Chatbot + WebApp 對話驗證（含兩輪問答：版本查詢 / 升級流程）。Screenshot 顯示 instance 健康、thinking indicator 正常、中文 UI 正常、conversation history 持久化。SOP 60-90 min 預估，實際分散 9 hours（12:52 set up 21:58 done，含寫 SOP 文件 + YouTube summary 平行工作）。

**Implications for future sessions:**
- `docker compose` 12-container stack 已 verified work — Lesson 2+ 不重教 self-host 雜訊
- Chatbot 沒 host environment access（AI 對「查版本」回"建議檢查 Settings/docker-compose.yml"）— 證明 Lesson 4-6 的 MCP/Tool/API integration 是必要 evolution，不是 luxury
- User 在 Win 之上額外問了「如何升級 Dify」→ 顯示探索性高，可能對 Lesson 8 observability / admin tasks 也有興趣
- 整體進度：Mission Definition of Done 6 項全 OK ✅ · 接下來進 Lesson 2 RAG - Customer Service Bot with Knowledge Base

**Status:** active

**Evidence:** image: `~/.openclaw/workspace/agents/ryo/media/inbound/openclaw-staged-4012a4a3-2b79-4a01-a16a-cdb44438e271/ef8cf29e-359d-40d0-86d0-df639959c73f.jpg`（Hello Dify WebApp 截圖 + 兩輪對話）
