FROM node:12-alpine
WORKDIR /usr/src/sender
COPY package.json .
# Install all Packages
RUN npm install
ADD ./sender/ /usr/src/sender
ADD tsconfig.json /usr/src/sender
RUN npm run build
EXPOSE 5858
ENTRYPOINT ["tail", "-f", "/dev/null"]