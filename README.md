# kaimier-web

## 项目结构

```text
kaimier-web/
├── apps/
│   ├── kaimier-site/     # kaimier.com 官网
│   └── kapis-platform/   # kapis.dev 平台
├── backend/
│   ├── springboot/       # Java API 服务
│   └── fastapi/          # Python API 服务（预留）
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
cd backend/springboot
mvn spring-boot:run
```

## Docker Compose 启动

```bash
docker compose up -d --build
```

- `kaimier.com` -> `kaimier-site`
- `kapis.dev` -> `kapis-platform`
- `kapis.dev/api/*` -> `api-springboot`

宿主机端口映射（直连调试时可用；对外入口为 nginx 的 **80**）：

| 服务 | 宿主机端口 | 容器端口 |
|------|------------|----------|
| nginx | 80 | 80 |
| kaimier-site | 3001 | 80 |
| kapis-platform | 3002 | 80 |
| api-springboot | 8080 | 8080 |

部署前请确保宿主机 **80 未被占用**（若曾装过系统 Nginx，需先 `sudo systemctl stop nginx` 等）。

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

若 **Deploy via SSH** 约 1 秒内失败，先看 **Check SSH port reachable** 这一步：

- **该步失败**：GitHub 连不上服务器 `IP:22`，多为 **安全组未放行**、**公网 IP 填错**、或 **SSH 未监听 22**，与私钥无关。
- **该步成功、SSH 步失败**：多为 **私钥与服务器 `authorized_keys` 不匹配**、**用户名不对**、或 **`TCLOUD_SSH_KEY` 粘贴缺行/换行**。

其他常见项：

- **`TCLOUD_PORT`**：未设置时工作流默认 `22`；建议 Secrets 里仍显式填 `22`。
- **私钥**：`TCLOUD_SSH_KEY` 须为完整 PEM（含 `BEGIN`/`END`）；Ed25519 / RSA 均可。
- **服务器拉代码**：需在服务器上能 `ssh -T git@github.com`（Deploy Key 或账号 SSH key）。

主分支 push 后将自动 SSH 到服务器并执行：

1. 拉取最新代码
2. `docker compose down`
3. `docker compose up -d --build`