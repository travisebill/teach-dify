# 0002: Lesson 0002（Customer Service Bot w/ KB · RAG）完成

User 在 docker self-host Dify 上完成 RAG Chatflow「瓦斯客服 Chatflow」：Question Classifier 三分流（瓦斯相關 / 不相關 / 緊急）+ Knowledge Retrieval 接 KB「瓦斯客服 FAQ」（20 條 Q&A、5 大類台灣天然氣）+ LLM 整合回答 + Answer node。實際 WebApp 對話驗證：客戶問「熱水器發出奇怪的聲音」AI 透過 KB 撈到對應 FAQ 條目並引導補充狀況。Recall Test 通過（FAQ 已 verified retrievable）。

**Implications for future sessions:**
- RAG KB pipeline 已 verified work — Lesson 3+ 不重教 embedding / chunking / Recall Test
- Question Classifier 三分流是 Lesson 3「緊急 → Human Input」升級的基礎結構，已存在 canvas
- 緊急分支目前是「丟 SOP 給客戶」並非「轉真人」——Lesson 3 是必要 evolution（不只是 nice-to-have）
- User 對話意圖顯示 KB 涵蓋率與 LLM 引導能力並用（會主動追問補充資料，符合客服 SOP）

**Status:** active

**Evidence:** image: `~/.openclaw/workspace/agents/ryo/media/inbound/openclaw-staged-51874e77-a543-487d-8d82-d6bbea38603c/0b6481ad-f9f3-4a47-82db-1c9258eda149.jpg`（瓦斯客服 Chatflow WebApp 截圖 + 「熱水器發出奇怪聲音」對話）