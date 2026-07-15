# DEPLOY.md — 把 teach-dify 部署到網路上

> Captured 2026-07-15 13:13 (Asia/Taipei) by Ryo ⚙️🐱
> **2026-07-15 13:15 updated**：改用 **ngrok**（cloudflared quick tunnel 今天 server-side fail，edge 沒把 request tunnel 進來 — 試 quic 跟 http2 protocol 都 404）
> URL 是 **ephemeral** —— tunnel process 一關就死，**session 結束就沒了**。
>
> **現 active URL (ngrok)**: `https://8389-118-167-134-157.ngrok-free.app` (2026-07-15 13:14 起，PIDs：server=61665 ngrok=61827)

---

## 🚀 A. 馬上能跑：ngrok HTTP Tunnel（5 min 設定 · 已驗證 2026-07-15）

> ngrok 3.x 免費版，無需註冊就能跑（會拿到 `*.ngrok-free.app` subdomain）。
> 缺點：tunnel process 一死 URL 立刻死。

### 1. 啟動本機 web server

```bash
cd ~/.openclaw/workspace/teach-dify
nohup python3 -m http.server 8765 --bind 127.0.0.1 > /tmp/teach-dify-server.log 2>&1 &
echo "server PID: $!"
```

驗證：`curl -I http://127.0.0.1:8765/lessons/0001-self-host-and-hello-world-chatbot.html` → `HTTP/1.0 200 OK`

### 2. 啟動 ngrok

```bash
nohup ngrok http 8765 --log /tmp/ngrok.log > /tmp/ngrok-stdout.log 2>&1 &
echo "ngrok PID: $!"
# 等 ~8 秒讓 ngrok 完成 tunnel 建立
sleep 8

# 從 ngrok API 拿 URL（比 parse log 穩）
curl -s http://127.0.0.1:4040/api/tunnels | python3 -c "import sys,json;print(json.load(sys.stdin)['tunnels'][0]['public_url'])"
```

會得到類似 `https://8389-118-167-134-157.ngrok-free.app` 的 URL。

### 3. 訪問

```
https://<你拿到的 URL>/lessons/0001-self-host-and-hello-world-chatbot.html
```

### 4. 關掉

```bash
# 找 PID
lsof -nP -iTCP:8765 -sTCP:LISTEN
lsof -nP -iTCP:4040 -sTCP:LISTEN   # ngrok web UI
kill <python_pid> <ngrok_pid>
# 或暴力法
pkill -f 'python.*http.server.*8765'
pkill -f 'ngrok http'
```

---

## 🛟 B. 備案：Cloudflare Quick Tunnel（2026-07-15 壞掉，僅記錄）

> 2026-07-15 測試時 `cloudflared tunnel --url http://localhost:8765` 雖然 local precheck PASS、tunnel connection 也 registered，但 Cloudflare edge 對 `*.trycloudflare.com` 子網域回 404，server log 完全沒收到 tunnel 進來的 request。
>
> 換 `--protocol http2` 也一樣。可能是當下 Cloudflare 服務問題。
>
> SO 不推薦當下用，但 SOP 留著以備將來恢復後可用：

### 1. 啟動本機 server（同上）

### 2. 啟動 cloudflared

```bash
nohup cloudflared tunnel --url http://localhost:8765 --no-autoupdate > /tmp/teach-dify-tunnel.log 2>&1 &
echo "tunnel PID: $!"
sleep 15
grep -oE 'https://[a-z-]+\.trycloudflare\.com' /tmp/teach-dify-tunnel.log | head -1
```

### 3. 訪問

```
https://<你拿到的 URL>/lessons/0001-self-host-and-hello-world-chatbot.html
```

### 4. 關掉

```bash
pkill -f 'cloudflared tunnel --url'
```

---

## 🛑 已知限制

| 限制 | 解法 |
|------|------|
| URL 每次重啟會換（random subdomain） | Quick Tunnel 特性。升永久請看下方。 |
| 不能登入 cloudflare 帳號 → 無 uptime guarantee | Quick Tunnel 只適合 demo / 開發 |
| Session 死了 URL 就死 | Session 結束前把 URL 留給對方 |
| 不支援自訂網域 | 升 Cloudflare Named Tunnel 或其他方案 |

---

## 🌐 B. 永久方案：Cloudflare Named Tunnel（推薦 if 有網域）

> 跟 cloudflare 帳號綁定，URL 永久，要自訂網域。

### Pre-req
- 一個網域（如 travisebill.com）
- Cloudflare 帳號 + 網域已加
- Domain 可改 NS 指向 cloudflare

### 1. 登入

```bash
cloudflared tunnel login
# 會跳到瀏覽器登入 cloudflare，選要用的網域
```

### 2. 建立 tunnel

```bash
cloudflared tunnel create teach-dify
# 輸出：Tunnel credentials written to /Users/nigo/.cloudflared/<UUID>.json
#     Created tunnel teach-dify with id <UUID>
```

### 3. 設 DNS

```bash
cloudflared tunnel route dns teach-dify dify.travisebill.com
# 或手動在 cloudflare dashboard 加 CNAME
```

### 4. 寫 config

`~/.cloudflared/config.yml`:
```yaml
tunnel: <UUID>
credentials-file: /Users/nigo/.cloudflared/<UUID>.json

ingress:
  - hostname: dify.travisebill.com
    service: http://localhost:8765
  - service: http_status:404
```

### 5. 啟動

```bash
cloudflared tunnel run teach-dify
# URL: https://dify.travisebill.com
```

### 6. 改為 service (選)

```bash
# macOS launchd
cloudflared service install
sudo launchctl start com.cloudflare.cloudflared
```

---

## 🌐 C. 永久方案：GitHub Pages

> 把整個 `teach-dify` 推到 GitHub new repo，workflow 自動 deploy。

### 1. 建 repo

GitHub 開 `travisebill/teach-dify`（private / public 你決定）。

### 2. 加入 remote + push

```bash
cd ~/.openclaw/workspace/teach-dify
git remote add origin git@github.com:travisebill/teach-dify.git
git push -u origin main
```

### 3. 設 Pages build

GitHub repo → Settings → Pages
- Source: GitHub Actions

### 4. 加 workflow

`.github/workflows/pages.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - id: deployment
        uses: actions/deploy-pages@v5
```

（從 `video-notes/.github/workflows/pages.yml` 抄過來，已驗證可跑）

### 5. URL

`https://travisebill.github.io/teach-dify/lessons/0001-self-host-and-hello-world-chatbot.html`

---

## 🌐 D. 永久方案：Netlify / Vercel / Surge（更簡單，但 Nigo 機器沒裝 CLI）

- **Netlify Drop** https://app.netlify.com/drop — 拖檔上去就能 deploy
- **Vercel** `npx vercel deploy`（要先裝 vercel CLI）
- **Surge** `npx surge`

---

## 📝 Notes

- 現 active URL：`https://tomatoes-sense-says-versus.trycloudflare.com`（Quick Tunnel，session-bound）
- 主人偏好：永久 hosting，session 結束也能讀 → 候選 B / C / D
- 主人有 `travis1897` GitHub → GitHub Pages (選項 C) 走 travisebill/teach-dify 跟他現有 repo 一致
- Pages service 最近不穩 (2026-07-04~05 卡過)，C 選項有 deployment 風險
- Named Tunnel (B) 最穩但要有網域
- Netlify (D) 最快但要登入
