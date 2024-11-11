import { Commands } from '../commands.ts'
import { REST, Routes } from 'discord.js'

const args = Deno.args[0]

const rest = new REST({ version: '10' }).setToken(Deno.env.get('TOKEN')!)

const deleteGuildCommands = () => {
  rest
    .put(
      Routes.applicationGuildCommands(
        Deno.env.get('CLIENT')!,
        Deno.env.get('GUILD')!,
      ),
      { body: [] },
    )
    .then(() =>
      console.log(`Successfully deleted ${Commands.length} guild commands`)
    )
    .catch(console.error)
}

const deleteGlobalCommands = () => {
  rest
    .put(Routes.applicationCommands(Deno.env.get('CLIENT')!), { body: [] })
    .then(() =>
      console.log(`Successfully deleted ${Commands.length} global commands`)
    )
    .catch(console.error)
}

switch (args) {
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
