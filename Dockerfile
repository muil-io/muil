# == STAGE 1
FROM node:14.15.0-alpine as builder

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build
RUN yarn build:client

# == STAGE 2
FROM node:14.15.0-alpine as production

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY apps/api/package.json ./apps/api/package.json
COPY apps/client/package.json ./apps/client/package.json
COPY libs/cloud-storage/package.json ./libs/cloud-storage/package.json
COPY libs/templates-renderer/package.json ./libs/templates-renderer/package.json
RUN yarn install --prod

COPY --from=builder /app/dist .
COPY --from=builder /app/prisma ./prisma


CMD [ "node", "./apps/api/src/main" ]
