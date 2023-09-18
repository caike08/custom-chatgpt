import { createContext, ReactNode, useState } from 'react'

import { Message } from '@/libs/validators/message'
import { nanoid } from 'nanoid'

type MessagesContextType = {
  messages: Message[],
  isMessageUpdating: boolean,
  addMessage: (message: Message) => void
  removeMessage: (id: string) => void
  updateMessage: (
    id: string,
    updateFn: (prevText: string) => string
  ) => void
  setIsMessageUpdating: (isUpdating: boolean) => void
}

const defaultValue: Message[] = [
  {
    id: nanoid(),
    isUserInput: false,
    text: 'Hello! How can I help you?'
  }
]

// Context allows to pass data through the component tree without having to pass props down manually
export const MessagesContext = createContext<MessagesContextType>({
  // initial state / fallback values
  messages: [],
  isMessageUpdating: false,
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
})

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>(defaultValue)

  const addMessage = (message: Message) => {
    setMessages((prev: Message[]) => {
      return [...prev, message]
    })
  }

  const removeMessage = (id: string) => {
    setMessages((prev: Message[]) => {
      return prev.filter(message => message.id !== id)
    })
  }

  const updateMessage = (id: string, updateFn: (prevText: string) => string) => {
    setMessages((prev: Message[]) => {
      return prev.map(message => {
        if (message.id === id) {
          return {
            ...message,
            text: updateFn(message.text)
          }
        }
        return message
      })
    })
  }

  return (
    <MessagesContext.Provider value={{
      messages,
      isMessageUpdating,
      addMessage,
      removeMessage,
      updateMessage,
      setIsMessageUpdating
    }}>
      {children}
    </MessagesContext.Provider>
  )
}
