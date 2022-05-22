FROM node:alpine

WORKDIR /usr/src/app

# Wildcard used to copy to container "package.json" AND "package-lock.json"
COPY ./package*.json ./
COPY ./app ./app
COPY ./config.js ./config.js
RUN npm install
COPY ./server.js ./
CMD ["npm","start"]