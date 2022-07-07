import { BaseCommandInteraction, CategoryChannel, Client } from 'discord.js'
import { ApplicationCommandOptionTypes, ApplicationCommandTypes, ChannelTypes } from 'discord.js/typings/enums'
import { CommandModule } from '../templates/commandModule'

export const CreateChannel: CommandModule = {
  name: 'create-channel',
  description: 'Creates a channel with the given name.',
  type: ApplicationCommandTypes.CHAT_INPUT,
  options: [
    {
      name: 'with-category',
      description: 'Create a channel in an existing category.',
      type: ApplicationCommandOptionTypes.SUB_COMMAND,
      options: [
        {
          name: 'category-name',
          description: 'Name of the category to put channel in.',
          type: ApplicationCommandOptionTypes.CHANNEL,
          channel_types: [ChannelTypes.GUILD_CATEGORY],
          required: true,
        },
        {
          name: 'channel-name',
          description: 'Name for the new channel',
          type: ApplicationCommandOptionTypes.STRING,
          required: true,
        },
      ],
    },
    {
      name: 'new-category',
      description: 'Create a channel inside a new category.',
      type: ApplicationCommandOptionTypes.SUB_COMMAND,
      options: [
        {
          name: 'category-name',
          description: 'Name of the category to put channel in.',
          type: ApplicationCommandOptionTypes.STRING,
          required: true,
        },
        {
          name: 'channel-name',
          description: 'Name for the new channel',
          type: ApplicationCommandOptionTypes.STRING,
          required: true,
        },
      ],
    },
    {
      name: 'no-category',
      description: 'Create a channel without a category',
      type: ApplicationCommandOptionTypes.SUB_COMMAND,
      options: [
        {
          name: 'channel-name',
          description: 'Name for the new channel',
          type: ApplicationCommandOptionTypes.STRING,
          required: true,
        },
      ],
    },
  ],

  async run(client: Client, interaction: BaseCommandInteraction) {
    const channelName = interaction.options.get('channel-name')?.value?.toString() ?? 'unknown'

    const commandName = interaction.options.data[interaction.options.data.length - 1].name

    const content = `Channel "${channelName}" is created`

    switch (commandName) {
    case 'with-category':
      await handleWithCategory(interaction, channelName, content)
      break

    case 'new-category':
    case 'no-category':
    }

  },
}

const handleWithCategory = async (interaction: BaseCommandInteraction, channelName: string, content: string) => {
  const categoryId = interaction.options.get('category-name')?.channel?.id ?? '0'
  const categoryChannel = await interaction.guild?.channels.fetch(categoryId)
  const categoryChannelResolved = <CategoryChannel> (await categoryChannel?.fetch(true))

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
}