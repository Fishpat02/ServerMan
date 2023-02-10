import ready from './listeners/ready'
import interactionCreate from './listeners/interactionCreate'
import { Client, IntentsBitField } from 'discord.js'

const client = new Client({ intents: [IntentsBitField.Flags.Guilds] })

ready(client)
interactionCreate(client)

void client.login(process.env.TOKEN)
