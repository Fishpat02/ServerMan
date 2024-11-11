import { Client, GatewayIntentBits } from 'discord.js'
import interactionCreate from './listeners/interactionCreate.ts'
import ready from './listeners/ready.ts'

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

ready(client)
interactionCreate(client)

void client.login(Deno.env.get('TOKEN'))
