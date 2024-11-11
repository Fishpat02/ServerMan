import ready from './listeners/ready.ts'
import interactionCreate from './listeners/interactionCreate.ts'
import { Client, IntentsBitField } from 'discord.js'
import process from "node:process";

const client = new Client({ intents: [IntentsBitField.Flags.Guilds] })

ready(client)
interactionCreate(client)

void client.login(process.env.TOKEN)
