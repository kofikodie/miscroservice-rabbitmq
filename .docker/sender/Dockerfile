FROM node:14.3.0-alpine3.10
WORKDIR /usr/src/sender
ADD package.prod.json /usr/src/sender/package.json
RUN yarn set version berry
RUN yarn
ADD .env.dev /usr/src/sender/.env
ADD ./dist/ /usr/src/sender
RUN rm -r receiver