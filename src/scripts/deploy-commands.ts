import 'dotenv/config'
import { Commands } from '../commands.ts'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'
import process from "node:process";

const args = process.argv.slice(2)

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN!)

const registerGuildCommands = () => {
  rest
    .put(
      Routes.applicationGuildCommands(process.env.CLIENT!, process.env.GUILD!),
      { body: Commands },
    )
    .then(() =>
      console.log(
        `Successfully registered ${Commands.length} guild commands.`,
      ),
    )
    .catch(console.error)
}

const registerGlobalCommands = () => {
  rest
    .put(Routes.applicationCommands(process.env.CLIENT!), { body: Commands })
    .then(() => {
      console.log(`Successfully registered ${Commands.length} global commands`)
    })
    .catch(console.error)
}

switch (args.pop()) {
case 'guild':
  registerGuildCommands()
  break
case 'global':
  registerGlobalCommands()
  break
default:
  registerGuildCommands()
  registerGlobalCommands()
  break
}
