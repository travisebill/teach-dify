# DEPLOY.md — 把 teach-dify 部署到網路上

> Captured 2026-07-15 13:13 (Asia/Taipei) by Ryo ⚙️🐱
> **2026-07-15 13:35 updated**：改用 **GitHub Pages**（永久 URL，session 結束也能讀）。ngrok / cloudflared quick tunnel 移到 deprecated 段。
>
> **現 active URL**: <https://travisebill.github.io/teach-dify/> ← 永久
> GitHub repo: <https://github.com/travisebill/teach-dify>
> Workflow: `.github/workflows/pages.yml`（跟 video-notes 同 pattern）

---

## ✅ A. 永久方案：GitHub Pages（active 2026-07-15）

### 是怎麼跑的
- Pages build_type = `legacy` · source = `gh-pages` branch · path = `/`
- Workflow：main push → force-push main → gh-pages branch → Pages auto-serve
- Verify step：等 30s + fetch 站 / lesson 1 / CSS · 確認 HTTP 200 + 內容 OK

### SOP（要重新 deploy 或建新 repo 時照做）

1. **建 repo**
   ```bash
   cd ~/.openclaw/workspace/teach-dify
   gh repo create travisebill/teach-dify \
     --public \
     --description "Dify teach skill workspace — AI 客服系統 mission + 8 lessons" \
     --source=. \
     --remote=origin \
     --push
   ```

2. **加 Pages workflow**（已寫好，檔案在 `.github/workflows/pages.yml`）
   - 跟 `video-notes/.github/workflows/pages.yml` 同 pattern
   - 不需 `actions/deploy-pages@v5`，用最簡單 `git push HEAD:gh-pages --force`

3. **啟用 Pages + 設 source = gh-pages**
   ```bash
   # 用 POST API（第一次啟用必須 POST，PUT 對新 site silent fail）
   cat > /tmp/pages-config.json <<'EOF'
   {
     "source": {"branch": "gh-pages", "path": "/"},
     "build_type": "legacy"
   }
   EOF
   gh api -X POST /repos/travisebill/teach-dify/pages --input /tmp/pages-config.json
   ```
   注意：用 `--input` 從檔案讀 JSON body，避免 zsh 把 `source[branch]=...` 當 glob 吃掉。

4. **加 root `index.html`**（否則 root URL 404，但深層路徑都 OK）
   - Pages 不會自動 serve 沒 `index.html` 的目錄

5. **驗證 URL**
   ```bash
   curl -I https://travisebill.github.io/teach-dify/
   # 應該 HTTP/2 200
   ```

### 重新 deploy / 更新內容
```bash
cd ~/.openclaw/workspace/teach-dify
# 改完檔案後
git add -A
git -c user.email="ryo@openclaw.local" -c user.name="Ryo ⚙️🐱" commit -m "..."
git push origin main
# → workflow 自動跑 → force-push to gh-pages → Pages rebuild
```

### Pages dashboard
- <https://github.com/travisebill/teach-dify/settings/pages>
- <https://github.com/travisebill/teach-dify/actions/workflows/pages.yml>

---

## 🪦 B. ngrok / cloudflared quick tunnel（已 deprecated，僅留記錄）

> 2026-07-15 試過兩個 quick tunnel，都不適合永久部署：
> - **cloudflared quick tunnel**：`<random>.trycloudflare.com` server-side routing fail，今天 edge 對 `*.trycloudflare.com` 全部回 404
> - **ngrok**：沒問題能跑（已驗證 HTML 200），但 free tier 每個 session 隨機網域，session-bound
>
> 因此正式 deploy 走 **Section A. GitHub Pages**。
>
> 以下兩段留 SOP 給未來偶爾想用 quick tunnel demo 時。

### B.1 ngrok HTTP Tunnel（5 min 設定 · 已驗證 2026-07-15）

```bash
# 1. local web server
cd ~/.openclaw/workspace/teach-dify
nohup python3 -m http.server 8765 --bind 127.0.0.1 > /tmp/teach-dify-server.log 2>&1 &

# 2. ngrok
nohup ngrok http 8765 --log /tmp/ngrok.log > /tmp/ngrok-stdout.log 2>&1 &
sleep 8

# 3. 拿 URL（從 ngrok API，比 parse log 穩）
curl -s http://127.0.0.1:4040/api/tunnels | python3 -c "import sys,json;print(json.load(sys.stdin)['tunnels'][0]['public_url'])"

# 4. 關掉
pkill -f 'python.*http.server.*8765'
pkill -f 'ngrok http'
```

### B.2 cloudflared Quick Tunnel（2026-07-15 壞掉，僅留 SOP）

> 試過 quic + http2 protocol 都失敗，Cloudflare edge 對 `*.trycloudflare.com` 子網域回 404。

```bash
nohup cloudflared tunnel --url http://localhost:8765 --no-autoupdate > /tmp/teach-dify-tunnel.log 2>&1 &
sleep 15
grep -oE 'https://[a-z-]+\.trycloudflare\.com' /tmp/teach-dify-tunnel.log | head -1
```

---

## 🔮 C. 未來選擇

| 方案 | URL 形式 | 永久 | 工作量 | 推薦時機 |
|------|---------|------|--------|---------|
| **A. GitHub Pages** ✅ 現行 | `travisebill.github.io/teach-dify/...` | ✅ | 5-10 min | 已是 active |
| Custom domain 進 GitHub Pages | `dify.travisebill.com` | ✅ | + DNS + CNAME | 之後想要自有網域 |
| Cloudflare Pages | `<name>.pages.dev` | ✅ | 裝 wrangler + login | 之後換平台 |
| Netlify Drop | `<random>.netlify.app` | ✅ | 拖檔 30s | 沒有 gh repo 時 |

---

## 📝 Notes

- 永久 URL **永久**：跟 OpenClaw session / 本機無關，GitHub 那邊活著就活
- AGENTS.md 永久教訓（2026-07-03）：Pages service 偶爾 fail，見 `[video-notes AGENTS.md]` Pages 監控設定（polling timeout ≥ 10 min）
- Pages build 大約 30-60s 一次，workflow verify step 等 30s
- 如果 Pages build 偶爾卡住，重跑 workflow（`gh workflow run pages.yml --repo travisebill/teach-dify`）通常就好
