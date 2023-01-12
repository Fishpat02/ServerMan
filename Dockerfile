FROM node:lts

RUN npm i -g yarn

COPY . .

RUN yarn install

RUN yarn build

CMD [ "yarn", "start" ]
