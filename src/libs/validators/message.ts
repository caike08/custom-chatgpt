import { z } from 'zod'

export const MessageSchema = z.object({
  id: z.string(),
  isUserInput: z.boolean(),
  text: z.string(),
})

// array validator
export const MessagesArraySchema = z.array(MessageSchema)

export type Message = z.infer<typeof MessageSchema>
export type MessagesArray = z.infer<typeof MessagesArraySchema>
