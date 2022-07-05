import 'dotenv/config'
import { Commands } from '../commands'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'
import { SlashCommandBuilder } from '@discordjs/builders'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'

const commands = Commands

commands.map(c => {
  const temp = new SlashCommandBuilder().setName(c.name).setDescription(c.description)

  if (c.options) {
    for (const option of c.options) {
      switch (option.type) {
      case ApplicationCommandOptionTypes.STRING:
        temp.addStringOption(o => o.setName(option.name).setDescription(option.description))
        break

      case ApplicationCommandOptionTypes.USER:
        temp.addUserOption(o => o.setName(option.name).setDescription(option.description))
        break
      }
    }
  }
})


const rest = new REST({ version:'10' }).setToken(process.env.TOKEN!)

rest.put(Routes.applicationGuildCommands(process.env.CLIENT!, process.env.GUILD!), { body: commands })
  .then(() => console.log(`Successfully registered ${commands.length} application commands.`))
  .catch(console.error)