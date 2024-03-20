FROM node:21-alpine as builder

LABEL author="abhishekaligh@gmail.com"

WORKDIR /app

COPY package.json /app

COPY pnpm-lock.yaml  /app

COPY tsconfig*.json /app

COPY nest-cli.json /app

RUN npm install -g pnpm && pnpm install

ADD . /app

RUN pnpm run build

FROM node:21-alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 8001

ENTRYPOINT [ "node" , "./dist/main.js"]