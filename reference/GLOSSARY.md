# GLOSSARY.md — Dify 術語速查

> Glossaries are the primary reference document. Adhere to these terms across all lessons.

---

## A. App 型態

### App
在 Dify 裡一個獨立可執行的 AI 應用。每個 app 有自己的 prompt / workflow / settings。

### Chatbot
最簡單的對話型 app：system prompt + LLM + 對話歷史記憶。無 workflow orchestration。

### Chatflow
多 node 串接的對話型 app。可以加入 Question Classifier、Knowledge Retrieval、If-Else 等節點做條件分支。

### Workflow
單次執行的工作流（不像 Chatbot 會持續對話）。輸入一組參數 → 跑一輪 → 出結果。

### Text Generator
單次 prompt 處理的 app（無對話記憶）。類似 ChatGPT 的一次性 generation。

### Agent / New Agent
讓 LLM 自主 reasoning + 用工具的 app。Dify 有兩個版本：Agent（舊）與 New Agent（新，推薦）。

---

## B. Studio / Workspace

### Workspace
Dify 的最高組織單位。一個 workspace 內有成員、app、knowledge bases、tools。多人協作的 scope 在 workspace。

### Studio
建 app 的地方。在 workspace 內可建多個 app。

### Knowledge
workspace 內的 knowledge base 管理區。不是 app，是「app 可引用的知識庫」。

### Model Provider
workspace 內設定 LLM provider 的地方（OpenAI / Anthropic / Cohere / Ollama 等）。

### System Reasoning Model
預設 LLM。Dify 預設所有 LLM node 沒指定就用這個。

---

## C. Node

### Node
workflow / chatflow 的一個執行單位。每個 node 有特定功能。

### Start Node
workflow 入口。可以是「有人 trigger」或「schedule」。

### LLM Node
呼叫 LLM 生成文字。需要指定 model + system / user prompt。

### Knowledge Retrieval Node
從 knowledge base 撈相關 chunks。可設 Top-K、score threshold。

### Question Classifier Node
用 LLM 把 user 輸入分類到預定類別。可多分支。

### If-Else Node
條件分支。條件可用前一個 node 的輸出做判斷。

### Answer Node
Chatflow 的「最終回答」點。把文字 output 給使用者。

### Human Input Node
pause workflow 等真人輸入。Lesson 3 轉人工客服時會用到。

### HTTP Request Node
打外部 HTTP API。可設 method / header / body，把結果當 variable 傳給下游。

### Code Node
跑 Python / JavaScript 客製邏輯。可讀前 node 變數、可寫入新變數。

### Tool Node
LLM 呼叫工具。工具可以是 HTTP API、Workflow as Tool、或 plugin。

### Agent Node
把整個 New Agent 當一個 node 嵌入 workflow。

---

## D. Knowledge Base

### Knowledge Base (KB)
結構化文件集合。支援 PDF / TXT / DOCX / Notion / Web URL 等資料源。

### Chunk
KB 內文件被切的最小單位。Dify 預設自動按段落切，可自訂。

### Embedding
把文字轉成向量的過程。向量之間的距離代表語意接近度。

### Vector Retrieval
用相似度搜 KB 找 chunks。

### Full-Text Retrieval
用關鍵字搜 KB。

### Hybrid Retrieval
vector + full-text 一起，設權重。

### Rerank
用 rerank model 把初步檢索的 chunks 重新排序，更精準。

### Recall Test
KB 內建的「檢索測試」工具。上線前必跑。

---

## E. Deploy

### Self-Host Dify
自己用 Docker Compose（或 K8s / source code）跑 Dify。資料、provider 全在自己機器上。

### Dify Cloud
Dify 官方維護的 SaaS 版本。免費 Sandbox 計畫起。

### Docker Compose
Dify 官方推薦的 self-host 方式。一個 `docker compose up -d` 起 12 個 container。

### weaviate
Dify 預設向量資料庫。

### init_permissions
Dify 一次性 container，跑完 Exited 是正常的。

---

## F. API & Integration

### /chat-messages
最主要的 API endpoint：發訊息給 chatbot / agent / chatflow，回 streaming response。

### conversation_id
Dify 對話 ID。同一個 conversation_id 會延續對話歷史。

### user (End User)
呼叫 API 的「使用者」。Dify 對這個欄位有嚴格要求（不可隨意變動）。

### streaming
Dify API 支援 SSE streaming。前端用 EventSource 接收。

### difyctl
Dify 官方 CLI。從 terminal / script / agent 跑 Dify apps。
