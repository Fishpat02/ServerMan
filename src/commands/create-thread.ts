import { CommandInteraction, Client, TextChannel } from 'discord.js'
import { ApplicationCommandType, ApplicationCommandOptionType, ChannelType } from 'discord.js'
import { CommandModule } from '../templates/commandModule'

export const CreateThread: CommandModule = {
  name: 'create-thread',
  description: 'Creates a new public thread in a given channel.',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'channel-name',
      description: 'Channel in which to create the thread.',
      type: ApplicationCommandOptionType.Channel,
      required: true,
      channel_types: [ChannelType.GuildText],
    },
    {
      name: 'thread-name',
      description: 'The name of the thread to create.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  async run(client: Client, interaction: CommandInteraction) {
    const threadName = interaction.options.get('thread-name')?.value?.toString() ?? 'unknown'
    const channelCache = interaction.options.get('channel-name')

    const channelId = channelCache?.channel?.id ?? 'unknown'

    const channel = <TextChannel> (await interaction.guild?.channels.fetch(channelId))

    const thread = await channel.threads.create({
      name: threadName,
      invitable: true,
    })

    await interaction.followUp({
      content: `Thread <#${thread.id}> has been created in <#${channel.id}>`,
    })
  },
}
