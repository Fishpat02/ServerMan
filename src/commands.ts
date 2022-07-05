import { CreateChannel } from './commands/create-channel'
import { Ping } from './commands/ping'
import { Server } from './commands/server'
import { User } from './commands/user'
import { CommandModule } from './templates/commandModule'

export const Commands: CommandModule[] = [
  CreateChannel,
  Ping,
  Server,
  User,
]