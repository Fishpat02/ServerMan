import { CreateChannel } from './commands/create-channel.ts'
import { CreateThread } from './commands/create-thread.ts'
import { DeleteChannel } from './commands/delete-channel.ts'
import type { CommandModule } from './templates/commandModule.ts'

export const Commands: CommandModule[] = [
  CreateChannel,
  CreateThread,
  DeleteChannel,
]
