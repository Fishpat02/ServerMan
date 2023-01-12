import ready from './listeners/ready'
import interactionCreate from './listeners/interactionCreate'
import { Client, Intents } from 'discord.js'

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

ready(client)
interactionCreate(client)

void client.login(process.env.TOKEN)
