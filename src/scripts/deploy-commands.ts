import 'dotenv/config'
import { Commands } from '../commands'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'

const rest = new REST({ version:'10' }).setToken(process.env.TOKEN!)

rest.put(Routes.applicationGuildCommands(process.env.CLIENT!, process.env.GUILD!), { body: Commands })
  .then(() => console.log(`Successfully registered ${Commands.length} application commands.`))
  .catch(console.error)