import type {
  CategoryChannel,
  Client,
  CommandInteraction,
  TextChannel,
} from 'discord.js'
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ChannelType,
} from 'discord.js'
import type { CommandModule } from '../templates/commandModule.ts'
import { BaseCommandNames, SubCommandNames } from '../templates/commandNames.ts'

export const DeleteChannel: CommandModule = {
  name: BaseCommandNames.DeleteChannel,
  description: 'Deletes selected channel or channels',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: SubCommandNames.Category,
      description: 'Deletes a category and each of the channels within',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: SubCommandNames.CategoryName,
          description: 'Name of the category to delete',
          type: ApplicationCommandOptionType.Channel,
          channel_types: [ChannelType.GuildCategory],
          required: true,
        },
      ],
    },
    {
      name: SubCommandNames.Channel,
      description: 'Deletes a channel',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: SubCommandNames.ChannelName,
          description: 'Name of the channel to delete',
          type: ApplicationCommandOptionType.Channel,
          channel_types: [ChannelType.GuildText],
          required: true,
        },
      ],
    },
  ],

  async run(_client: Client, interaction: CommandInteraction) {
    const commandName = interaction.options.data.at(0)!.name

    switch (commandName) {
      case SubCommandNames.Category:
        await handleCategory(interaction)
        break

      case SubCommandNames.Channel:
        await handleChannel(interaction)
        break
    }
  },
}

const handleCategory = async (interaction: CommandInteraction) => {
  const categoryChannel = interaction.options.get(
    SubCommandNames.CategoryName,
    true,
  ).channel! as CategoryChannel

  const categoryName = categoryChannel.name

  try {
    const children = categoryChannel.children.cache

    for (const child of children) {
      await child[1].delete()
    }

    await categoryChannel.delete()

    await interaction.followUp({
      content: `Category "${categoryName}" and channels deleted`,
    })
  } catch {
    await interaction.followUp({
      content:
        `Failed to delete category ${categoryChannel.toString()} and its children`,
    })
  }
}

const handleChannel = async (interaction: CommandInteraction) => {
  const textChannel = interaction.options.get(
    SubCommandNames.ChannelName,
    true,
  ).channel! as TextChannel

  const channelName = textChannel.name

  try {
    await textChannel.delete()

    await interaction.followUp({
      content: `Channel "${channelName}" successfully deleted`,
    })
  } catch {
    await interaction.followUp({
      content: `Failed to delete channel ${textChannel.toString()}`,
    })
  }
}
