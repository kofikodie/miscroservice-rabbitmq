FROM node:14.3.0-alpine3.10
WORKDIR /usr/src/receiver
ADD package.prod.json /usr/src/receiver/package.json
RUN yarn set version berry
RUN yarn
ADD .env.dev /usr/src/receiver/.env
ADD ./dist/ /usr/src/receiver
RUN rm -r sender