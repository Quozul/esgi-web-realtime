FROM node:20-alpine as builder

WORKDIR /app

COPY package.json package-lock.json .
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

