FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable
COPY package.json ./
RUN pnpm install --frozen-lockfile=false

COPY . .
RUN pnpm generate

FROM nginx:1.27-alpine
COPY --from=builder /app/.output/public /usr/share/nginx/html
