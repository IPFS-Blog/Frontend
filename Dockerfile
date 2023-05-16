###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:16-alpine AS development
RUN apk add --no-cache libc6-compat

# 創建應用目錄
WORKDIR /app

# 複製依賴清單到容器鏡像裡.
# 複制package.json和yarn.lock, 複製到當前應用目錄.
# 首先複製這個選項可以防止在每次代碼更改時重新運行npm install.
COPY package.json yarn.lock ./

# 傳入 --production=true 確保只安裝了生產依賴項。這確保node_modules目錄盡可能優化
RUN  yarn install --production=true

###################
# BUILD FOR PRODUCTION
###################

FROM node:16-alpine AS build

# 創建應用目錄
WORKDIR /app

# 把安裝後依賴全部複製到指定目錄
COPY --from=development /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

# 執行打包命令
RUN yarn build

###################
# PRODUCTION
###################

FROM node:16-alpine AS production

# 創建應用目錄
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]