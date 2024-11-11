import type { Client } from 'discord.js'

import { Events } from 'discord.js'

export default (client: Client): void => {
  client.once(Events.ClientReady, (readyClient) => {
    if (!readyClient.user || !readyClient.application) {
      return
    }

    console.log(`${readyClient.user.tag} is ready!`)
  })
}
