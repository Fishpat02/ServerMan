import { Commands } from '../commands.ts'
import { REST, Routes } from 'discord.js'

const args = Deno.args[0]

const rest = new REST({ version: '10' }).setToken(Deno.env.get('TOKEN')!)

const registerGuildCommands = () => {
  rest
    .put(
      Routes.applicationGuildCommands(
        Deno.env.get('CLIENT')!,
        Deno.env.get('GUILD')!,
      ),
      { body: Commands },
    )
    .then(() =>
      console.log(
        `Successfully registered ${Commands.length} guild commands.`,
      )
    )
    .catch(console.error)
}

const registerGlobalCommands = () => {
  rest
    .put(Routes.applicationCommands(Deno.env.get('CLIENT')!), {
      body: Commands,
    })
    .then(() => {
      console.log(`Successfully registered ${Commands.length} global commands`)
    })
    .catch(console.error)
}

switch (args) {
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
