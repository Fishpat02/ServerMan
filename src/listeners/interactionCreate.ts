import type { Client, CommandInteraction, Interaction } from 'discord.js'

import { Events } from 'discord.js'
import { Commands } from '../commands.ts'

export default (client: Client): void => {
  client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleSlashCommand(client, interaction)
    }
  })
}

const handleSlashCommand = async (
  client: Client,
  interaction: CommandInteraction,
) => {
  const command = Commands.find((c) => c.name === interaction.commandName)

  if (!command) {
    void interaction.followUp({
      ephemeral: true,
      content: `Command ${interaction.commandName} not found`,
    })
    return
  }

  await interaction.deferReply({
    ephemeral: true,
  })

  return command.run(client, interaction)
}
