FROM node:lts-alpine

WORKDIR /home/node

COPY . .

RUN rm -rf node_modules && chown -R node:node /home/node/

USER node:node

RUN yarn install --production && yarn cache clean

CMD [ "yarn", "start" ]
