FROM node:12-alpine
WORKDIR /usr/src/app
COPY package.json .
# Install all Packages
RUN npm install
ADD ./reciver /usr/src/app
RUN npm run build