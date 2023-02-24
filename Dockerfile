#syntax:docker/dockerfile:1
FROM node:16.14.2-alpine AS base
WORKDIR /app
COPY ["package.json", "yarn.loc*", "./"]

FROM base AS dev
ENV NODE_ENV=development
RUN yarn install --frozen-lockfile
COPY . .
CMD ["yarn", "start:dev"]

FROM dev AS test
ENV NODE_ENV=test
CMD ["yarn", "test"]

FROM base AS prod
ENV NODE_ENV=production
RUN yarn install --frozen-lockfile --production
COPY . .
RUN yarn add global @nestjs/cli
RUN yarn build
CMD ["yarn", "start:prod"]