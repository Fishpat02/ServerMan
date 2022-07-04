import { BaseCommandInteraction, Client } from 'discord.js'
import { ApplicationCommandTypes } from 'discord.js/typings/enums'
import { CommandModule } from '../templates/commandModule'


export const Ping: CommandModule = {
  name: 'ping',
  description: 'Replies with Pong!',
  type: ApplicationCommandTypes.CHAT_INPUT,

  async run(client: Client, interaction: BaseCommandInteraction) {
    const content = 'Pong!'

    await interaction.followUp({
      ephemeral: true,
      content,
    })
  },
}