FROM node:12-alpine
WORKDIR /usr/src/receiver
COPY package.json .
# Install all Packages
RUN npm install
ADD ./receiver /usr/src/receiver
ADD tsconfig.json /usr/src/receiver
RUN npm run build
EXPOSE 5858
ENTRYPOINT ["tail", "-f", "/dev/null"]