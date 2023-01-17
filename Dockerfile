FROM node:lts-alpine

WORKDIR /

COPY . .

RUN yarn install --production && yarn cache clean

CMD [ "yarn", "start" ]
