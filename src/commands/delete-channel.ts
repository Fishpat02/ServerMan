import { Client, CommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, ChannelType, CategoryChannel, TextChannel } from 'discord.js'
import { CommandModule } from '../templates/commandModule'

export const DeleteChannel: CommandModule = {
  name: 'delete-channel',
  description: 'Deletes selected channel or channels',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'category',
      description: 'Deletes a category and each of the channels within',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'category-name',
          description: 'Name of the category to delete',
          type: ApplicationCommandOptionType.Channel,
          channel_types: [ChannelType.GuildCategory],
          required: true,
        },
      ],
    },
    {
      name: 'channel',
      description: 'Deletes a channel',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'channel-name',
          description: 'Name of the channel to delete',
          type: ApplicationCommandOptionType.Channel,
          channel_types: [ChannelType.GuildText],
          required: true,
        },
      ],
    },
  ],

<<<<<<< HEAD
=======

>>>>>>> refs/remotes/origin/main
  async run(client: Client, interaction: CommandInteraction) {
    const commandName = interaction.options.data[interaction.options.data.length - 1].name

    switch (commandName) {
    case 'category':
      await handleCategory(interaction)
      break

    case 'channel':
      await handleChannel(interaction)
      break
    }
  },
}

const handleCategory = async (interaction: CommandInteraction) => {
  const categoryId = interaction.options.get('category-name')?.channel?.id ?? '0'
  const categoryChannel = await interaction.guild?.channels.fetch(categoryId)
  const categoryChannelResolved = <CategoryChannel> (await categoryChannel?.fetch(true))

  try {
    const children = categoryChannelResolved.children.cache

    for (const child of children) {
      await child[1].delete()
    }

    await categoryChannelResolved.delete()

    await interaction.followUp({
      content: 'Category and channels deleted',
    })
  }
  catch {
    await interaction.followUp({
      content: 'An error has occurred',
    })
  }
}

const handleChannel = async (interaction: CommandInteraction) => {
  const channelId = interaction.options.get('channel-name')?.channel?.id ?? '0'
  const textChannel = await interaction.guild?.channels.fetch(channelId)
  const textChannelResolved = <TextChannel> (await textChannel?.fetch(true))

  try {
    await textChannelResolved.delete()

    await interaction.followUp({
      content: 'Channel successfully deleted',
    })
  }
  catch {
    await interaction.followUp({
      content: 'An error has occurred',
    })
  }
}
