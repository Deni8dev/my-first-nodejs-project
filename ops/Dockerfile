### Build Stage ###
FROM node:9.11.1-alpine as builder

COPY package.json package-lock.json ./
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app
WORKDIR /ng-app
COPY . .
RUN $(npm bin)/www

### Setup Stage ###
FROM nginx:1.15.0-alpine

COPY ops/nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
## Copy dist directory from 'builder' stage to nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
