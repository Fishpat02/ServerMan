import type { Client, CommandInteraction, TextChannel } from 'discord.js'
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ChannelType,
} from 'discord.js'
import type { CommandModule } from '../templates/commandModule.ts'
import { BaseCommandNames, SubCommandNames } from '../templates/commandNames.ts'

export const CreateThread: CommandModule = {
  name: BaseCommandNames.CreateThread,
  description: 'Creates a new public thread in a given channel.',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: SubCommandNames.Channel,
      description: 'Channel in which to create the thread.',
      type: ApplicationCommandOptionType.Channel,
      required: true,
      channel_types: [ChannelType.GuildText],
    },
    {
      name: SubCommandNames.ThreadName,
      description: 'The name of the thread to create.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  async run(_client: Client, interaction: CommandInteraction) {
    const threadName = interaction.options.get(SubCommandNames.ThreadName, true)
      .value!
      .toString()

    const channel = interaction.options.get(SubCommandNames.Channel, true)
      .channel! as TextChannel

    try {
      const thread = await channel.threads.create({
        name: threadName,
        invitable: true,
      })

      await interaction.followUp({
        content:
          `Thread ${thread.toString()} has been created in ${channel.toString()}`,
      })
    } catch {
      await interaction.followUp({
        content: `Failed to create "${threadName}" in ${channel.toString()}`,
      })
    }
  },
}
