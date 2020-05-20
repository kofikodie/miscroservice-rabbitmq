FROM node:14.0.0-alpine3.10
WORKDIR /usr/src/receiver
ADD package.prod.json /usr/src/receiver/package.json
RUN yarn set version berry
RUN yarn install
ADD .env.dev /usr/src/receiver/.env
ADD ./dist/receiver /usr/src/receiver