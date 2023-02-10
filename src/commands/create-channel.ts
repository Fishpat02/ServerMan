import { CommandInteraction, CategoryChannel, Client } from 'discord.js'
import { ApplicationCommandType, ApplicationCommandOptionType, ChannelType } from 'discord.js'
import { CommandModule } from '../templates/commandModule'

export const CreateChannel: CommandModule = {
  name: 'create-channel',
  description: 'Creates a channel with the given name.',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'with-category',
      description: 'Create a channel in an existing category.',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'category-name',
          description: 'Name of the category to put channel in.',
          type: ApplicationCommandOptionType.Channel,
          channel_types: [ChannelType.GuildCategory],
          required: true,
        },
        {
          name: 'channel-name',
          description: 'Name for the new channel',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: 'new-category',
      description: 'Create a channel inside a new category.',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'category-name',
          description: 'Name of the category to put channel in.',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: 'channel-name',
          description: 'Name for the new channel',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: 'no-category',
      description: 'Create a channel without a category',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'channel-name',
          description: 'Name for the new channel',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
  ],

  async run(client: Client, interaction: CommandInteraction) {
    const channelName = interaction.options.get('channel-name')?.value?.toString() ?? 'unknown'
    const categoryName = interaction.options.get('category-name')?.value?.toString() ?? 'unknown'

    const commandName = interaction.options.data[interaction.options.data.length - 1].name

    switch (commandName) {
    case 'with-category':
      await handleWithCategory(interaction, channelName)
      break

    case 'new-category':
      await handleNewCategory(interaction, channelName, categoryName)
      break

    case 'no-category':
      await handleNoCategory(interaction, channelName)
    }

  },
}

const handleWithCategory = async (interaction: CommandInteraction, channelName: string) => {
  const categoryId = interaction.options.get('category-name')?.channel?.id ?? '0'
  const categoryChannel = await interaction.guild?.channels.fetch(categoryId)
  const categoryChannelResolved = <CategoryChannel> (await categoryChannel?.fetch(true))

  try {
    const textChannel = await interaction.guild?.channels.create({
      name: channelName,
      type: ChannelType.GuildText,
      parent: categoryChannelResolved,
    })

    await interaction.followUp({
      content: `Channel <#${textChannel?.id ?? '0'}> has been created in "${categoryChannelResolved.name}"`,
    })
  }
  catch {
    await interaction.followUp({
      content: 'An error has occurred',
    })
  }
}

const handleNewCategory = async (interaction: CommandInteraction, channelName: string, categoryName: string) => {
  try {
    const categoryChannel = await interaction.guild?.channels.create({
      name: categoryName,
      type: ChannelType.GuildCategory,
    })

    const textChannel = await interaction.guild?.channels.create({
      name: channelName,
      type: ChannelType.GuildText,
      parent: categoryChannel,
    })

    await interaction.followUp({
      content: `Category "${categoryName}" has been created.\nChannel <#${textChannel?.id ?? '0'}> has been created in "${categoryName}"`,
    })
  }
  catch {
    await interaction.followUp({
      content: 'An error has occurred.',
    })
  }
}

const handleNoCategory = async (interaction: CommandInteraction, channelName: string) => {
  try {
    const textChannel = await interaction.guild?.channels.create({
      name: channelName,
      type: ChannelType.GuildText,
    })

    await interaction.followUp({
      content: `Channel <#${textChannel?.id ?? '0'}> has been created.`,
    })
  }
  catch {
    await interaction.followUp({
      content: 'An error has occurred',
    })
  }
}
