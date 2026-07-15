# RESOURCES.md — Dify 學習資源

> Captured 2026-07-15 13:00 (Asia/Taipei) by Ryo ⚙️🐱
> 任務：1 個月密集 + 之後 side project。底層全為 `docs.dify.ai` 官方文件。

---

## 🎯 入口

| 用途 | URL | 備註 |
|------|------|------|
| Dify Documentation index | https://docs.dify.ai | 主入口 |
| **完整文件索引 llms.txt** | https://docs.dify.ai/llms.txt | 200+ 頁清單（必查） |
| Key Concepts | https://docs.dify.ai/en/learn/key-concepts.md | 概念速覽 |
| Discord | https://discord.gg/FngNHpbcY7 | 社群 |
| GitHub | https://github.com/langgenius/dify | open source |
| Marketplace | https://marketplace.dify.ai/ | 社群 app / template / plugin |

---

## 🐳 A. Self-host（Docker Compose / 部署）— Lesson 1 主線

| 用途 | URL | 備註 |
|------|------|------|
| **Deploy Dify 總覽** | https://docs.dify.ai/en/self-host/deploy/overview.md | 5 種部署方式總覽 |
| **Docker Compose（推薦）⭐** | https://docs.dify.ai/en/self-host/deploy/quick-start/docker-compose.md | 5 min 起跑，要求 CPU≥2 / RAM≥4GiB / Compose 2.24.0+ |
| Local Source Code Start | https://docs.dify.ai/en/self-host/deploy/advanced-deployments/local-source-code.md | 想改 platform 源碼時用 |
| Environment Variables | https://docs.dify.ai/en/self-host/deploy/configuration/environments.md | 全部 env reference |
| FAQs | https://docs.dify.ai/en/self-host/deploy/quick-start/faqs.md | |
| Common Issues / Docker Issues | https://docs.dify.ai/en/self-host/deploy/troubleshooting/common-issues.md | troubleshooting |
| Storage & Migration | https://docs.dify.ai/en/self-host/deploy/troubleshooting/storage-and-migration.md | 換 storage / DB migration |
| Dify Premium on AWS | https://docs.dify.ai/en/self-host/deploy/platform-guides/dify-premium.md | 進階 |

### A.1 Docker Compose SOP（精簡，verbatim from docs）
```bash
# 1. clone latest release
git clone --branch "$(curl -s https://api.github.com/repos/langgenius/dify/releases/latest | jq -r .tag_name)" https://github.com/langgenius/dify.git

# 2. 進 docker dir
cd dify/docker
cp .env.example .env

# 3. 起 12 個 containers（6 core + 6 deps）
docker compose up -d

# 4. 驗證
docker compose ps     # all "Up" or "healthy"

# 5. 訪問 http://localhost/install 設 admin → http://localhost
```

12 個 services：
- **6 core**: `api` / `api_websocket` / `worker` / `worker_beat` / `web` / `plugin_daemon`
- **6 deps**: `weaviate` (向量) / `db_postgres` / `redis` / `nginx` / `ssrf_proxy` / `sandbox`
- 1 one-shot: `init_permissions`（`Exited` 是正常的）

---

## 🚀 B. 30-min Quick Start / Tutorials（lesson 2-4 主線）

| 用途 | URL | 對應 lesson |
|------|------|-------------|
| 30-min Quick Start | https://docs.dify.ai/en/quick-start.md | **跳過**——太進階（Multi-platform content generator 9 nodes 串接） |
| **Customer Service Bot with Knowledge Base ⭐⭐** | https://docs.dify.ai/en/learn/tutorials/customer-service-bot.md | **Lesson 2 主線**——跟 mission 一字不差 |
| Simple Chatbot (Hello World) | https://docs.dify.ai/en/learn/tutorials/simple-chatbot.md | Lesson 1 結束後最低門檻熟悉 UI |
| Article Reader | https://docs.dify.ai/en/learn/tutorials/article-reader.md | Chatbot + file upload |
| Twitter Account Analyzer | https://docs.dify.ai/en/learn/tutorials/twitter-chatflow.md | Chatflow + external API（HTTP Request node） |

### B.1 Workflow 101（10 lesson 課程，**Dify 101 官方**）

**官方從 0 到 Advanced AI Email Assistant 的 10 個 lesson**：

| L# | 主題 | URL |
|---|---|---|
| 1 | What is a Workflow? | https://docs.dify.ai/en/learn/tutorials/workflow-101/lesson-01.md |
| 2 | Head and Tail (Start & Output) | https://docs.dify.ai/en/learn/tutorials/workflow-101/lesson-02.md |
| 3 | The Brain (LLM Node) | https://docs.dify.ai/en/learn/tutorials/workflow-101/lesson-03.md |
| 4 | The Cheat Sheet (Knowledge Retrieval) | https://docs.dify.ai/en/learn/tutorials/workflow-101/lesson-04.md |
| 5 | Sorting & Executing (If/Else, Question Classifier) | https://docs.dify.ai/en/learn/tutorials/workflow-101/lesson-05.md |
| 6 | Parameter Extraction & Iteration | https://docs.dify.ai/en/learn/tutorials/workflow-101/lesson-06.md |
| 7 | Enhance Workflows (Tools) | https://docs.dify.ai/en/learn/tutorials/workflow-101/lesson-07.md |
| 8 | The Agent Node | https://docs.dify.ai/en/learn/tutorials/workflow-101/lesson-08.md |
| 9 | Layout Designer (Template) | https://docs.dify.ai/en/learn/tutorials/workflow-101/lesson-09.md |
| 10 | Publish and Monitor | https://docs.dify.ai/en/learn/tutorials/workflow-101/lesson-10.md |

**整個 10 lesson 跑完 ≈ 5-10 小時 = 相當於把 Dify workflow 整套概念走完。可以當 Lesson 3-7 的速成教材穿插。**

---

## 🧱 C. App 類型 + Build（決定每個 lesson 用什麼 app type）

| App type | URL | 何時用 |
|---|---|---|
| **Chatbot** | https://docs.dify.ai/en/self-host/use-dify/build/chatbot.md | **Lesson 1-2**——最簡單 conversational app |
| Text Generator | https://docs.dify.ai/en/self-host/use-dify/build/text-generator.md | 單次 prompt |
| **Agent** | https://docs.dify.ai/en/self-host/use-dify/build/agent.md | Lesson 6+——autonomous reasoning + tools |
| New Agent | https://docs.dify.ai/en/self-host/use-dify/build/new-agent/overview.md | 新版 agent |
| **Workflow & Chatflow ⭐** | https://docs.dify.ai/en/self-host/use-dify/build/workflow-chatflow.md | **Lesson 3-5**——客戶 handoff、multi-step |
| Orchestration Logic | https://docs.dify.ai/en/self-host/use-dify/build/orchestrate-node.md | 巢狀 / 重用 |
| Workflow Collaboration | https://docs.dify.ai/en/self-host/use-dify/build/workflow-collaboration.md | 多人協作 |
| Version Control | https://docs.dify.ai/en/self-host/use-dify/build/version-control.md | app 版控 |
| App Toolkit | https://docs.dify.ai/en/self-host/use-dify/build/additional-features.md | optional features |
| Predefined Error Handling | https://docs.dify.ai/en/self-host/use-dify/build/predefined-error-handling-logic.md | 錯誤分支 |

---

## 🔧 D. Nodes（workflow / chatflow 核心元件）— Lesson 2-7

| Node | URL | 用途 |
|------|------|------|
| **Start** | https://docs.dify.ai/en/self-host/use-dify/nodes/start.md | 入口（on-demand / scheduled） |
| **LLM** | https://docs.dify.ai/en/self-host/use-dify/nodes/llm.md | 呼叫 LLM |
| **Knowledge Retrieval ⭐** | https://docs.dify.ai/en/self-host/use-dify/nodes/knowledge-retrieval.md | **RAG 核心** |
| **Answer** | https://docs.dify.ai/en/self-host/use-dify/nodes/answer.md | Chatflow 輸出 |
| **If-Else** | https://docs.dify.ai/en/self-host/use-dify/nodes/ifelse.md | 條件分支（判斷是否轉人工） |
| **Question Classifier** | https://docs.dify.ai/en/self-host/use-dify/nodes/question-classifier.md | 智慧分流 |
| Parameter Extractor | https://docs.dify.ai/en/self-host/use-dify/nodes/parameter-extractor.md | NLP → 結構化資料 |
| **Human Input ⭐** | https://docs.dify.ai/en/self-host/use-dify/nodes/human-input.md | **Lesson 3**——轉人工 |
| **HTTP Request ⭐** | https://docs.dify.ai/en/self-host/use-dify/nodes/http-request.md | **Lesson 4**——打後台 API |
| **Code ⭐** | https://docs.dify.ai/en/self-host/use-dify/nodes/code.md | **Lesson 5**——客製邏輯（Python/JS） |
| **Tool ⭐** | https://docs.dify.ai/en/self-host/use-dify/nodes/tools.md | **Lesson 5+**——LLM 呼叫工具 |
| **Agent** | https://docs.dify.ai/en/self-host/use-dify/nodes/agent.md | 整個 agent 包進 workflow |
| Doc Extractor | https://docs.dify.ai/en/self-host/use-dify/nodes/doc-extractor.md | doc 抽 text |
| List Operator | https://docs.dify.ai/en/self-host/use-dify/nodes/list-operator.md | 過濾 / sort array |
| Iteration | https://docs.dify.ai/en/self-host/use-dify/nodes/iteration.md | 陣列逐項 |
| Loop | https://docs.dify.ai/en/self-host/use-dify/nodes/loop.md | 重複 + 收斂 |
| Template | https://docs.dify.ai/en/self-host/use-dify/nodes/template.md | Jinja2 formatting |
| Variable Aggregator | https://docs.dify.ai/en/self-host/use-dify/nodes/variable-aggregator.md | 分支匯聚 |
| Variable Assigner | https://docs.dify.ai/en/self-host/use-dify/nodes/variable-assigner.md | conversation-level var |
| User Input | https://docs.dify.ai/en/self-host/use-dify/nodes/user-input.md | 起始輸入 |
| Output | https://docs.dify.ai/en/self-host/use-dify/nodes/output.md | workflow 結果輸出 |
| Triggers | https://docs.dify.ai/en/self-host/use-dify/nodes/trigger/overview.md | integration / schedule / webhook |

---

## 📚 E. Knowledge / RAG — Lesson 2 主線

| 用途 | URL |
|------|------|
| Knowledge 總覽 | https://docs.dify.ai/en/self-host/use-dify/knowledge/readme.md |
| **Create Knowledge Base ⭐** | https://docs.dify.ai/en/self-host/use-dify/knowledge/create-knowledge/introduction.md |
| Chunking / Cleaning | https://docs.dify.ai/en/self-host/use-dify/knowledge/create-knowledge/chunking-and-cleaning-text.md |
| Index Method / Retrieval | https://docs.dify.ai/en/self-host/use-dify/knowledge/create-knowledge/setting-indexing-methods.md |
| Upload Local Files | https://docs.dify.ai/en/self-host/use-dify/knowledge/create-knowledge/import-text-data/readme.md |
| **Integrate KB within Apps ⭐** | https://docs.dify.ai/en/self-host/use-dify/knowledge/integrate-knowledge-within-application.md |
| Maintain Docs | https://docs.dify.ai/en/self-host/use-dify/knowledge/manage-knowledge/maintain-knowledge-documents.md |
| Document Metadata | https://docs.dify.ai/en/self-host/use-dify/knowledge/metadata.md |
| **Test Retrieval ⭐** | https://docs.dify.ai/en/self-host/use-dify/knowledge/test-retrieval.md |
| External KB API | https://docs.dify.ai/en/self-host/use-dify/knowledge/external-knowledge-api.md |
| Knowledge Pipeline | https://docs.dify.ai/en/self-host/use-dify/knowledge/knowledge-pipeline/readme.md |
| Connect External KB | https://docs.dify.ai/en/self-host/use-dify/knowledge/connect-external-knowledge-base.md |
| KB Rate Limit | https://docs.dify.ai/en/self-host/use-dify/knowledge/knowledge-request-rate-limit.md |

---

## 🔌 F. API Reference（後端整合）— Lesson 6 主線

> 禮士做後端整合一定要熟 `chat-messages` API。

| 用途 | URL |
|------|------|
| **Get Started with Dify API ⭐** | https://docs.dify.ai/en/api-reference/guides/get-started.md |
| **Send Chat Message ⭐** | https://docs.dify.ai/en/api-reference/chat-messages/send-chat-message.md | 
| Stop Chat Generation | https://docs.dify.ai/en/api-reference/chat-messages/stop-chat-message-generation.md |
| Get Next Suggested Questions | https://docs.dify.ai/en/api-reference/chat-messages/get-next-suggested-questions.md |
| Streaming Responses | https://docs.dify.ai/en/api-reference/guides/streaming.md |
| Knowledge API | https://docs.dify.ai/en/api-reference/guides/knowledge.md |
| Chat App API (Chatbot/Agent) | https://docs.dify.ai/en/api-reference/guides/chat.md |
| Chatflow API | https://docs.dify.ai/en/api-reference/guides/chatflow.md |
| Workflow API | https://docs.dify.ai/en/api-reference/guides/workflow.md |
| Agent API (New Agent) | https://docs.dify.ai/en/api-reference/guides/agent.md |
| Completion API | https://docs.dify.ai/en/api-reference/guides/completion.md |
| Human Input Flow API | https://docs.dify.ai/en/api-reference/guides/human-input-flow.md |
| End User Identity | https://docs.dify.ai/en/api-reference/guides/end-user-identity.md |
| Handle Errors / Rate Limits | https://docs.dify.ai/en/api-reference/guides/errors.md |
| Run Workflow | https://docs.dify.ai/en/api-reference/workflow-runs/run-workflow.md |
| Stream Workflow Events | https://docs.dify.ai/en/api-reference/workflow-runs/stream-workflow-events.md |
| Conversations | https://docs.dify.ai/en/api-reference/conversations/list-conversations.md |
| Files (upload/download) | https://docs.dify.ai/en/api-reference/files/upload-file.md |
| Annotations | https://docs.dify.ai/en/api-reference/annotations/list-annotations.md |
| Audio (TTS/STT) | https://docs.dify.ai/en/api-reference/audio/convert-text-to-audio.md |
| Feedback | https://docs.dify.ai/en/api-reference/feedback/submit-message-feedback.md |

---

## 🧑‍🤝‍🧑 G. Workspace / 多租戶 SaaS — Lesson 7 主線

| 用途 | URL |
|------|------|
| **Workspace Overview ⭐** | https://docs.dify.ai/en/self-host/use-dify/workspace/readme.md | 
| Manage Members | https://docs.dify.ai/en/self-host/use-dify/workspace/team-members-management.md |
| App Management | https://docs.dify.ai/en/self-host/use-dify/workspace/app-management.md |
| Tools (workspace level) | https://docs.dify.ai/en/self-host/use-dify/workspace/tools.md |
| Model Providers | https://docs.dify.ai/en/self-host/use-dify/workspace/model-providers.md |
| Plugins | https://docs.dify.ai/en/self-host/use-dify/workspace/plugins.md |
| API Extension | https://docs.dify.ai/en/self-host/use-dify/workspace/api-extension/api-extension.md |
| External Data Tool API | https://docs.dify.ai/en/self-host/use-dify/workspace/api-extension/external-data-tool-api-extension.md |

---

## 📊 H. Monitor / Observability — Lesson 8 主線

| 用途 | URL |
|------|------|
| Analysis Dashboard | https://docs.dify.ai/en/self-host/use-dify/monitor/analysis.md |
| Logs (real-time conv) | https://docs.dify.ai/en/self-host/use-dify/monitor/logs.md |
| Annotation Reply | https://docs.dify.ai/en/self-host/use-dify/monitor/annotation-reply.md |
| **Langfuse Integration** | https://docs.dify.ai/en/self-host/use-dify/monitor/integrations/integrate-langfuse.md |
| LangSmith | https://docs.dify.ai/en/self-host/use-dify/monitor/integrations/integrate-langsmith.md |
| Opik | https://docs.dify.ai/en/self-host/use-dify/monitor/integrations/integrate-opik.md |
| Phoenix | https://docs.dify.ai/en/self-host/use-dify/monitor/integrations/integrate-phoenix.md |
| W&B Weave | https://docs.dify.ai/en/self-host/use-dify/monitor/integrations/integrate-weave.md |
| Run History / Step Run | https://docs.dify.ai/en/self-host/use-dify/debug/history-and-logs.md |
| Variable Inspector | https://docs.dify.ai/en/self-host/use-dify/debug/variable-inspect.md |
| Error Types | https://docs.dify.ai/en/self-host/use-dify/debug/error-type.md |

---

## 💻 I. CLI (difyctl) — 進階

| 用途 | URL |
|------|------|
| Overview | https://docs.dify.ai/en/cli/overview.md |
| Quick Start | https://docs.dify.ai/en/cli/quick-start.md |
| Install | https://docs.dify.ai/en/cli/install.md |
| Common Tasks | https://docs.dify.ai/en/cli/common-tasks.md |
| Apps Reference | https://docs.dify.ai/en/cli/reference/apps.md |
| Workspaces | https://docs.dify.ai/en/cli/reference/workspaces.md |
| Authenticate | https://docs.dify.ai/en/cli/authenticate.md |
| Troubleshooting | https://docs.dify.ai/en/cli/troubleshooting.md |

---

## 🏪 J. Publish / 對外發布

| 用途 | URL |
|------|------|
| Publish Overview | https://docs.dify.ai/en/self-host/use-dify/publish/README.md |
| MCP Server (Claude/Cursor) | https://docs.dify.ai/en/cloud/use-dify/publish/publish-mcp.md |
| Chat Web Apps | https://docs.dify.ai/en/cloud/use-dify/publish/webapp/chatflow-webapp.md |
| Workflow Web Apps | https://docs.dify.ai/en/cloud/use-dify/publish/webapp/workflow-webapp.md |
| Embed Web App | https://docs.dify.ai/en/cloud/use-dify/publish/webapp/embedding-in-websites.md |
| Publish to Marketplace | https://docs.dify.ai/en/cloud/use-dify/publish/publish-to-marketplace.md |

---

## 🧩 K. Plugin / 擴充（進階）

| 用途 | URL |
|------|------|
| Plugin 入門 | https://docs.dify.ai/en/develop-plugin/getting-started/getting-started-dify-plugin.md |
| Plugin Type 選擇 | https://docs.dify.ai/en/develop-plugin/getting-started/choose-plugin-type.md |
| Plugin CLI | https://docs.dify.ai/en/develop-plugin/getting-started/cli.md |
| Tool Plugin 範例（Google Search） | https://docs.dify.ai/en/develop-plugin/dev-guides-and-walkthroughs/tool-plugin.md |
| Endpoint Plugin（Neko Cat） | https://docs.dify.ai/en/develop-plugin/dev-guides-and-walkthroughs/endpoint.md |
| Model Provider Plugin | https://docs.dify.ai/en/develop-plugin/dev-guides-and-walkthroughs/creating-new-model-provider.md |
| Slack Bot Plugin | https://docs.dify.ai/en/develop-plugin/dev-guides-and-walkthroughs/develop-a-slack-bot-plugin.md |

---

## 📝 Notes

- **主人 Dify 經驗**：slightly used, 基本 UI OK → Lesson 1 不重教「什麼是 workspace / studio」
- **主人會 Python + FastAPI + Reflex** → 後端整合 (Section F) 可以 code-heavy
- **預設部署**：self-host Docker Compose（本地）。若主人改用 Cloud，section A 換成 cloud.dify.ai 路徑
- **官方「Customer Service Bot with Knowledge Base」一文**完全對應主人 mission，Lesson 2 主線
- **官方「Workflow 101」10 lesson** 是 system 完整概念地圖，可穿插在 Lesson 3-5 加深
- **知識截止**：2026-07-15 docs.dify.ai 內容；如有改版（特別是 Node 命名、API path），更新 RESOURCES.md
