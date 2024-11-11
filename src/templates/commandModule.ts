import type {
  ChatInputApplicationCommandData,
  Client,
  CommandInteraction,
} from 'discord.js'

export interface CommandModule extends ChatInputApplicationCommandData {
  run(client: Client, interaction: CommandInteraction): Promise<void>
}
