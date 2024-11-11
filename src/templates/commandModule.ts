import type { CommandInteraction, ChatInputApplicationCommandData, Client } from 'discord.js'

export interface CommandModule extends ChatInputApplicationCommandData {
	run(client: Client, interaction: CommandInteraction): Promise<void>;
}
