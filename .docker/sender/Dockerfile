FROM node:12-alpine
WORKDIR /usr/src/app
COPY package.json .
# Install all Packages
RUN npm install
ADD ./sender/ /usr/src/app
ADD tsconfig.json /usr/src/app
RUN npm run build