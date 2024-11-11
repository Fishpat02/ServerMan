import 'dotenv/config'
import { Commands } from '../commands.ts'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'
import process from "node:process";

const args = process.argv.slice(2)

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN!)

const deleteGuildCommands = () => {
  rest
    .put(
      Routes.applicationGuildCommands(process.env.CLIENT!, process.env.GUILD!),
      { body: [] },
    )
    .then(() =>
      console.log(`Successfully deleted ${Commands.length} guild commands`),
    )
    .catch(console.error)
}

const deleteGlobalCommands = () => {
  rest
    .put(Routes.applicationCommands(process.env.CLIENT!), { body: [] })
    .then(() =>
      console.log(`Successfully deleted ${Commands.length} global commands`),
    )
    .catch(console.error)
}

switch (args.pop()) {
case 'guild':
  deleteGuildCommands()
  break

case 'global':
  deleteGlobalCommands()
  break

default:
  deleteGuildCommands()
  deleteGlobalCommands()
  break
}
