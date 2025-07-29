# FROM node:20-alpine AS development-dependencies-env
# COPY . /app
# WORKDIR /app
# RUN npm ci

# FROM node:20-alpine AS production-dependencies-env
# COPY ./package.json package-lock.json /app/
# WORKDIR /app
# RUN npm ci --omit=dev

# FROM node:20-alpine AS build-env
# COPY . /app/
# COPY --from=development-dependencies-env /app/node_modules /app/node_modules
# WORKDIR /app
# RUN npm run build

# FROM node:20-alpine
# COPY ./package.json package-lock.json /app/
# COPY --from=production-dependencies-env /app/node_modules /app/node_modules
# COPY --from=build-env /app/build /app/build
# WORKDIR /app
# CMD ["npm", "run", "start"]

# 阶段 1：开发依赖环境（包含 devDependencies）
FROM node:20-alpine AS development-dependencies-env

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

COPY . /app
RUN pnpm install

# 阶段 2：生产依赖环境（不包含 devDependencies）
FROM node:20-alpine AS production-dependencies-env

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

# 阶段 3：构建阶段
FROM node:20-alpine AS build-env

WORKDIR /app

RUN npm install -g pnpm

COPY . /app/
COPY --from=development-dependencies-env /app/node_modules ./node_modules

RUN pnpm run build

# 阶段 4：最终运行环境
FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
COPY --from=production-dependencies-env /app/node_modules ./node_modules
COPY --from=build-env /app/build ./build
EXPOSE 3000
CMD ["pnpm", "run", "start"]
