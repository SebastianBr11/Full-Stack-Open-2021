FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build


FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
