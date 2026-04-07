# kaimier-web

## 项目结构

```text
kaimier-web/
├── apps/
│   ├── kaimier-site/     # kaimier.com 官网
│   └── kapis-platform/   # kapis.dev 平台
├── backend/              # API 服务
├── nginx/
│   ├── nginx.conf
│   ├── conf.d/
│   │   ├── kaimier.com.conf
│   │   └── kapis.dev.conf
│   ├── local/gateway.conf
│   └── prod/gateway.conf
├── compose.yaml
└── .github/workflows/deploy.yml
```

## 本地开发

```bash
pnpm install
pnpm --filter kaimier-site dev
pnpm --filter kapis-platform dev
cd backend
mvn spring-boot:run
```

## Docker Compose 启动

```bash
docker compose up -d --build
```

- `kaimier.com` -> `kaimier-site`
- `kapis.dev` -> `kapis-platform`
- `kapis.dev/api/*` -> `backend`

宿主机端口映射（直连调试，不经 Nginx）：

| 服务 | 宿主机端口 | 容器端口 |
|------|------------|----------|
| nginx | 80 | 80 |
| kaimier-site | 3001 | 80 |
| kapis-platform | 3002 | 80 |
| backend | 8080 | 8080 |

Nginx 默认包含 `local/gateway.conf`，如需线上策略可将 `conf.d/*.conf` 中的 include 改为 `prod/gateway.conf`。

## GitHub Actions 自动部署（腾讯云轻量）

已提供工作流：`.github/workflows/deploy.yml`

请在 GitHub 仓库 `Settings -> Secrets and variables -> Actions` 中添加：

- `TCLOUD_HOST`：服务器公网 IP
- `TCLOUD_PORT`：SSH 端口（通常 22）
- `TCLOUD_USER`：SSH 登录用户（如 `root`）
- `TCLOUD_SSH_KEY`：私钥内容（PEM）
- `DEPLOY_PATH`：服务器部署目录（如 `/opt/kaimier-web`）
- `REPO_SSH_URL`：仓库 SSH 地址（如 `git@github.com:org/repo.git`）

若 **Deploy via SSH** 约 1 秒内失败，常见原因：

- **`TCLOUD_PORT` 留空**：旧版工作流会把空端口传给 SSH，导致立即失败；当前工作流已改为未设置时默认 `22`。仍建议在 Secrets 里显式填 `22`。
- **私钥格式**：`TCLOUD_SSH_KEY` 须为完整 PEM（含 `BEGIN`/`END`），粘贴后勿多空格；Ed25519 / RSA 均可。
- **安全组 / 防火墙**：腾讯云轻量须放行入站 **22**（来源可 `0.0.0.0/0`，否则 GitHub Actions 出口 IP 不固定会连不上）。
- **服务器上拉代码**：首次需在服务器上能 `ssh -T git@github.com` 成功（已配置 Deploy Key 或账号 SSH key）。

主分支 push 后将自动 SSH 到服务器并执行：

1. 拉取最新代码
2. `docker compose down`
3. `docker compose up -d --build`