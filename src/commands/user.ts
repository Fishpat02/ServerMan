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
    },
  ],

  async run(client, interaction) {
    const content = `User tag: ${interaction.user.tag}\nUser id: ${interaction.user.id}`

    await interaction.followUp({
      content,
    })
  },
}