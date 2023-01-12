FROM node:lts

WORKDIR /

COPY . .

RUN yarn install --production && yarn cache clean

CMD [ "yarn", "start" ]
