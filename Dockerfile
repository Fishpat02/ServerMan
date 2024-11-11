FROM node:lts

COPY . .

RUN yarn install --production

CMD [ "yarn", "start" ]
