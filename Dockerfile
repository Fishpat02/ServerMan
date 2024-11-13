FROM denoland/deno:alpine

WORKDIR /app

COPY . .

USER deno

RUN deno cache src/bot.ts

CMD [ "deno", "run", "--allow-read", "--allow-env", "--allow-net", "src/bot.ts" ]
