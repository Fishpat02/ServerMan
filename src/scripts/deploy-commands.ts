import 'dotenv/config'
import { Commands } from '../commands'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { SlashCommandBuilder } from '@discordjs/builders'

const commands = Commands

commands.map(c => new SlashCommandBuilder().setName(c.name).setDescription(c.description).toJSON())

const rest = new REST({ version:'9' }).setToken(process.env.TOKEN!)

rest.put(Routes.applicationGuildCommands(process.env.CLIENT!, process.env.GUILD!), { body: commands })
  .then(() => console.log(`Successfully registered ${commands.length} application commands.`))
  .catch(console.error)