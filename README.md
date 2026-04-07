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

主分支 push 后将自动 SSH 到服务器并执行：

1. 拉取最新代码
2. `docker compose down`
3. `docker compose up -d --build`