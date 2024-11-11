import type { CategoryChannel, Client, CommandInteraction } from 'discord.js'
import type { CommandModule } from '../templates/commandModule.ts'
import {
  BaseCommandNames,
  CommandNames,
  SubCommandNames,
} from '../templates/commandNames.ts'

import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ChannelType,
} from 'discord.js'

export const CreateChannel: CommandModule = {
  name: BaseCommandNames.CreateChannel,
  description: 'Creates a channel with the given name.',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: CommandNames.WithCategory,
      description: 'Create a channel in an existing category.',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: SubCommandNames.CategoryName,
          description: 'Name of the category to put channel in.',
          type: ApplicationCommandOptionType.Channel,
          channel_types: [ChannelType.GuildCategory],
          required: true,
        },
        {
          name: SubCommandNames.ChannelName,
          description: 'Name for the new channel',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: CommandNames.NewCategory,
      description: 'Create a channel inside a new category.',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: SubCommandNames.CategoryName,
          description: 'Name of the category to put channel in.',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: SubCommandNames.ChannelName,
          description: 'Name for the new channel',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: CommandNames.NoCategory,
      description: 'Create a channel without a category',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: SubCommandNames.ChannelName,
          description: 'Name for the new channel',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
  ],

  async run(_client: Client, interaction: CommandInteraction) {
    const channelName = interaction.options
      .get(SubCommandNames.ChannelName, true)
      .value?.toString() ?? ''
    const categoryName = interaction.options
      .get(SubCommandNames.CategoryName)
      ?.value?.toString() ?? ''

    const commandName = interaction.options.data.at(-1)!.name

    switch (commandName) {
      case CommandNames.WithCategory:
        await handleWithCategory(interaction, channelName)
        break

      case CommandNames.NewCategory:
        await handleNewCategory(interaction, channelName, categoryName)
        break

      case CommandNames.NoCategory:
        await handleNoCategory(interaction, channelName)
    }
  },
}

const handleWithCategory = async (
  interaction: CommandInteraction,
  channelName: string,
) => {
  const categoryChannel = interaction.options.get(
    SubCommandNames.CategoryName,
    true,
  ).channel! as CategoryChannel

  try {
    const textChannel = await interaction.guild!.channels.create({
      name: channelName,
      type: ChannelType.GuildText,
      parent: categoryChannel,
    })

    await interaction.followUp({
      content:
        `Channel ${textChannel.toString()} has been created in "${categoryChannel.name}"`,
    })
  } catch {
    await interaction.followUp({
      content:
        `Failed to create channel "${channelName}" in "${categoryChannel.name}"`,
    })
  }
}

const handleNewCategory = async (
  interaction: CommandInteraction,
  channelName: string,
  categoryName: string,
) => {
  try {
    const categoryChannel = await interaction.guild!.channels.create({
      name: categoryName,
      type: ChannelType.GuildCategory,
    })

    const textChannel = await interaction.guild!.channels.create({
      name: channelName,
      type: ChannelType.GuildText,
      parent: categoryChannel,
    })

    await interaction.followUp({
      content: `Category "${categoryName}" has been created.
        Channel ${textChannel.toString()} has been created in "${categoryName}"`,
    })
  } catch {
    await interaction.followUp({
      content:
        `Failed to create channel "${channelName}" inside of category "${categoryName}"`,
    })
  }
}

const handleNoCategory = async (
  interaction: CommandInteraction,
  channelName: string,
) => {
  try {
    const textChannel = await interaction.guild!.channels.create({
      name: channelName,
      type: ChannelType.GuildText,
    })

    await interaction.followUp({
      content: `Channel ${textChannel.toString()} has been created.`,
    })
  } catch {
    await interaction.followUp({
      content: `Failed to create channel "${channelName}"`,
    })
  }
}
