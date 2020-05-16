FROM node:14.0.0-alpine3.10
WORKDIR /usr/src/sender
COPY package.json .
RUN yarn install --production
ADD .env.dev /usr/src/sender/.env
ADD ./dist/sender /usr/src/sender
#ENTRYPOINT ["tail", "-f", "/dev/null"]