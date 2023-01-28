import { CreateChannel } from './commands/create-channel'
import { CreateThread } from './commands/create-thread'
import { CommandModule } from './templates/commandModule'

export const Commands: CommandModule[] = [
  CreateChannel,
  CreateThread,
]
