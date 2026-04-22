FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile=false

COPY . .

# 默认根路径；在网关反代到 /admin/ 时，构建产物需要匹配子路径
ARG VITE_BASE=/
ENV VITE_BASE=$VITE_BASE
RUN pnpm build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
