import { BaseCommandInteraction, Client } from 'discord.js'
import { ApplicationCommandTypes } from 'discord.js/typings/enums'
import { CommandModule } from '../templates/commandModule'

export const Server: CommandModule = {
  name: 'server',
  description: 'Responds with server info!',
  type: ApplicationCommandTypes.CHAT_INPUT,

  async run(client: Client, interaction: BaseCommandInteraction) {
    const content = `Server name: ${interaction.guild?.name ?? 'Unknown'}\nServer id: ${interaction.guildId ?? 0}`

    await interaction.followUp({
      content,
    })
  },
}