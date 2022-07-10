import { BaseCommandInteraction, Client, TextChannel } from 'discord.js'
import { ApplicationCommandOptionTypes, ApplicationCommandTypes, ChannelTypes } from 'discord.js/typings/enums'
import { CommandModule } from '../templates/commandModule'

export const CreateThread: CommandModule = {
  name: 'create-thread',
  description: 'Creates a new public thread in a given channel.',
  type: ApplicationCommandTypes.CHAT_INPUT,
  options: [
    {
      name: 'channel-name',
      description: 'Channel in which to create the thread.',
      type: ApplicationCommandOptionTypes.CHANNEL,
      required: true,
      channel_types: [ChannelTypes.GUILD_TEXT],
    },
    {
      name: 'thread-name',
      description: 'The name of the thread to create.',
      type: ApplicationCommandOptionTypes.STRING,
      required: true,
    },
  ],

  async run(client: Client, interaction: BaseCommandInteraction) {
    const threadName = interaction.options.get('thread-name')?.name.toString() ?? 'unknown'
    const channelCache = interaction.options.get('channel-name')

    const channelId = channelCache?.channel?.id ?? 'unknown'

    const channel = <TextChannel> (await interaction.guild?.channels.fetch(channelId))

    const thread = await channel.threads.create({
      name: threadName,
      invitable: true,
      startMessage: `Created at ${Date.now.toString()}`,
    })

    await interaction.followUp({
      content: `Thread <#${thread.id}> has been created in <#${channel.id}>`,
    })
  },
}