FROM node:lts

COPY . .

RUN yarn install

RUN yarn build

CMD [ "yarn", "start" ]
