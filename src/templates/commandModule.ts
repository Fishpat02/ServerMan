import { BaseCommandInteraction, ChatInputApplicationCommandData, Client } from 'discord.js'

export interface CommandModule extends ChatInputApplicationCommandData {
	run(client: Client, interaction: BaseCommandInteraction): Promise<void>;
}