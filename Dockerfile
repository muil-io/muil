# == STAGE 1
FROM node:14.15.0-alpine as builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY apps/api/package.json ./apps/api/package.json
COPY apps/client/package.json ./apps/client/package.json
COPY libs/cloud-storage/package.json ./libs/cloud-storage/package.json
COPY libs/templates-renderer/package.json ./libs/templates-renderer/package.json
RUN yarn install

COPY apps ./apps
COPY libs ./libs
COPY prisma ./prisma
COPY nest-cli.json ./nest-cli.json
COPY tsconfig.build.json ./tsconfig.build.json
COPY tsconfig.json ./tsconfig.json
RUN yarn prisma:generate
RUN yarn build
# RUN yarn build:client

# == STAGE 2
FROM node:14.15.0-alpine as production

WORKDIR /app

#RUN apk add --no-cache \
#      chromium \
#      nss \
#      freetype \
#      harfbuzz \
#      ca-certificates \
#      ttf-freefont

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY package.json .
COPY yarn.lock .
COPY apps/api/package.json ./apps/api/package.json
COPY libs/cloud-storage/package.json ./libs/cloud-storage/package.json
COPY libs/templates-renderer/package.json ./libs/templates-renderer/package.json
RUN yarn install --prod

COPY --from=builder /app/dist .

RUN mkdir templates
ENV TEMPLATES_DIRECTORY=/app/templates

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma/empty.db ./db/muil.db
RUN yarn prisma:dbpush
RUN yarn prisma:generate

ENV PORT=3000
EXPOSE $PORT

CMD [ "node", "./apps/api/src/main" ]
