import { Client, GatewayIntentBits } from 'discord.js'
import process from 'node:process'
import interactionCreate from './listeners/interactionCreate.ts'
import ready from './listeners/ready.ts'

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

ready(client)
interactionCreate(client)

void client.login(process.env.TOKEN)
