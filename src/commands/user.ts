import { ApplicationCommandOptionTypes, ApplicationCommandTypes } from 'discord.js/typings/enums'
import { CommandModule } from '../templates/commandModule'

export const User: CommandModule = {
  name: 'user',
  description: 'Replies with the user\'s information!',
  type: ApplicationCommandTypes.CHAT_INPUT,
  options: [
    {
      name: 'user',
      description: 'The user to pick.',
      type: ApplicationCommandOptionTypes.USER,
      required: true,
    },
  ],

  async run(client, interaction) {
    const content = `User tag: ${interaction.options.getUser('user')?.tag ?? 'Unknown#0000'}\nUser id: ${interaction.options.getUser('user')?.id ?? 0}`

    await interaction.followUp({
      content,
    })
  },
}