FROM node:13-alpine
WORKDIR /usr/src/receiver
COPY package.json .
# Install all Packages
RUN npm install
ADD ./receiver /usr/src/receiver
ADD tsconfig.json /usr/src/receiver
RUN npm run build
ENTRYPOINT ["tail", "-f", "/dev/null"]