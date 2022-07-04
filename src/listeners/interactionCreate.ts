import { BaseCommandInteraction, Client, Interaction } from 'discord.js'
import { Commands } from '../commands'

export default (client: Client): void => {
  client.on('interactionCreate', async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      await handleSlashCommand(client, interaction)
    }
  })
}

const handleSlashCommand = async (client: Client, interaction: BaseCommandInteraction) => {
  const command = Commands.find(c => c.name === interaction.commandName)

  if (!command) {
    void interaction.followUp({
      ephemeral: true,
      content: 'An error has occurred',
    })
    return
  }

  await interaction.deferReply({
    ephemeral: true,
  })

  void command.run(client, interaction)
}