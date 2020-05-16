FROM node:14.0.0-alpine3.10
WORKDIR /usr/src/receiver
COPY package.json .
RUN yarn install --production
ADD .env.dev /usr/src/receiver/.env
ADD ./dist/receiver /usr/src/receiver
#ENTRYPOINT ["tail", "-f", "/dev/null"]