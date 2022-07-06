import { BaseCommandInteraction, CategoryChannel, Client } from 'discord.js'
import { ApplicationCommandOptionTypes, ApplicationCommandTypes, ChannelTypes } from 'discord.js/typings/enums'
import { CommandModule } from '../templates/commandModule'

export const CreateChannel: CommandModule = {
  name: 'create-channel',
  description: 'Creates a channel with the given name.',
  type: ApplicationCommandTypes.CHAT_INPUT,
  options: [
    {
      name: 'category-name',
      description: 'Name of the category to put channel in.',
      type: ApplicationCommandOptionTypes.CHANNEL,
      channelTypes: [ChannelTypes.GUILD_CATEGORY],
      required: true,
    },
    {
      name: 'channel-name',
      description: 'Name for the new channel',
      type: ApplicationCommandOptionTypes.STRING,
      required: true,
    },
  ],

  async run(client: Client, interaction: BaseCommandInteraction) {
    const channelName = interaction.options.get('channel-name')?.value?.toString() ?? 'unknown'

    const categoryId = interaction.options.get('category-name')?.channel?.id ?? '0'
    const categoryChannel = await interaction.guild?.channels.fetch(categoryId)
    const categoryChannelResolved = <CategoryChannel> (await categoryChannel?.fetch(true))

    const content = `Channel ${channelName} is created`

    try {
      await interaction.guild?.channels.create(channelName, {
        type: 'GUILD_TEXT',
        parent: categoryChannelResolved,
      })

      await interaction.followUp({
        content,
      })
    }
    catch {
      await interaction.followUp({
        content: 'An error has occurred',
      })
    }
  },
}