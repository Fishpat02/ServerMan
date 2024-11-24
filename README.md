# ServerMan(ager)

This bot is a personal project, intended to be a sandbox for my typescript that
slowly turned into an actually useful tool in my Discord servers. It can
create/delete channels, threads and categories programmatically via the Discord
interactions API. (Slash commands)

## Command guide

- `/create-channel`\
  Creates a channel, either inside a new or existing category, or without a
  category, with the following options:
  - `with-category <category_name> <channel_name>`
  - `new-category  <category_name> <channel_name>`
  - `no-category   <channel_name>`

- `/create-thread`\
  Creates a thread inside of a given, existing channel.
  - `<channel_name> <thread_name>`

- `/delete-channel`\
  Deletes a channel or category, and all channels contained within, with the
  following options:
  - `category <category_name>`
  - `channel <channel_name>`

## Deployment

- Docker\
  To deploy using Docker, you simply need to do as follows, assuming you have
  Docker installed on your system:

  ```bash
  docker run -d -t \
    -e TOKEN="<YOUR_DISCORD_BOT_TOKEN>" \
    -e CLIENT="<BOT_CLIENT>" \
    # for the guild deployment option
    -e GUILD="<GUILD_ID>" \
    --name serverman \
  fishpat02/serverman:latest
  ```

  or for docker compose:

  ```yaml
  name: serverman

  services:
    bot:
      name: serverman
      image: fishpat02/serverman:latest
      environment:
        TOKEN: <YOUR_DISCORD_BOT_TOKEN>
        CLIENT: <BOT_CLIENT>
        GUILD: <GUILD_ID>
  ```

- Deno\
  This is likely the easiest way to run this bot, and is as follows:
  `Deno run start`
