FROM node:24-bookworm-slim AS builder

WORKDIR /app

ARG ENV
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# node-gyp toolchain for native modules (@parcel/watcher, bcrypt, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
      python3 make g++ openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY nest-cli.json ./nest-cli.json
COPY tsconfig.build.json ./tsconfig.build.json
COPY tsconfig.json ./tsconfig.json
COPY apps/api/tsconfig.json ./apps/api/tsconfig.json
COPY apps/client/.babelrc ./apps/client/.babelrc
COPY apps/client/webpack.config.js ./apps/client/webpack.config.js
COPY libs/cloud-storage/tsconfig.json ./libs/cloud-storage/tsconfig.json
COPY libs/cloud-storage/tsconfig.json ./libs/cloud-storage/tsconfig.json
COPY prisma/schema.prisma ./prisma/schema.prisma

COPY package.json .
COPY yarn.lock .
COPY apps/api/package.json ./apps/api/package.json
COPY apps/client/package.json ./apps/client/package.json
COPY libs/cloud-storage/package.json ./libs/cloud-storage/package.json
COPY libs/templates-renderer/package.json ./libs/templates-renderer/package.json

RUN yarn install

COPY apps ./apps
COPY libs ./libs

RUN yarn build
RUN yarn build:client

RUN yarn install --prod

FROM node:24-bookworm-slim

WORKDIR /app

ARG ENV
ENV ENV=$ENV

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV TEMPLATES_DIRECTORY=/app/templates
ENV SAMPLE_TEMPLATES_DIRECTORY=/app/sample-templates
ENV DATABASE_URL=file:../db/muil.db

RUN apt-get update && apt-get install -y --no-install-recommends \
      sqlite3 \
      chromium \
      openssl \
      ca-certificates \
      fonts-liberation \
      fonts-noto-color-emoji \
    && rm -rf /var/lib/apt/lists/*

COPY entry.sh ./entry.sh
COPY prisma/schema.prisma ./prisma/schema.prisma
COPY prisma/migrations ./prisma/migrations
COPY sample-templates ./sample-templates
COPY --from=builder /app/dist .
COPY --from=builder /app/node_modules ./node_modules

ENV PORT=3000
EXPOSE $PORT

RUN mkdir -p /app/.muil/temp
RUN chown node /app/.muil/temp

ENTRYPOINT ["/app/entry.sh"]