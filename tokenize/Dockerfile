FROM node:16.14-bullseye

WORKDIR /amazintech

COPY package.json .
RUN yarn install

COPY . .
CMD yarn start
