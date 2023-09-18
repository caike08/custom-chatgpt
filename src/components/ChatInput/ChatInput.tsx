"use client"  // used to declare a boundary between a Server and Client Component modules
import { CornerDownLeft, Loader2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { FC, HTMLAttributes, useContext, useState, useRef } from 'react'
import { nanoid } from 'nanoid'
import { toast } from 'react-hot-toast'
import TextareaAutosize from 'react-textarea-autosize'

import { cn } from '@/libs/utils'
import { Message } from '@/libs/validators/message'
import { MessagesContext } from '@/context/messages'

// Interfaces are essentially a means of describing the shape of data, like an object.
// On the other hand, types are definitions of data types.
// Check more at: https://blog.bitsrc.io/type-vs-interface-in-typescript-cf3c00bc04ae
interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<ChatInputProps> = ({className, ...props}) => {
  const textAreaRef = useRef<null | HTMLTextAreaElement>(null)
  const [input, setInput] = useState('')

  const {
    messages,
    isMessageUpdating,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(MessagesContext)

  const { mutate: sendMessage, isLoading } = useMutation({
    mutationFn: async (message: Message) => {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      })

      // throw error if something goes wrong
      if (!response.ok) {
        throw new Error(response.statusText)
      }

      return response.body
    },
    onMutate(message) {
      addMessage(message)
    },
    onSuccess: async (stream) => {
      if (!stream) throw new Error('No stream found :(')

      const id = nanoid()

      const responseMessage: Message = {
        id,
        isUserInput: false,
        text: '',
      }

      addMessage(responseMessage)

      setIsMessageUpdating(true)

      const reader = stream.getReader()
      const decoder = new TextDecoder()
      let done = false

      while(!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)

        updateMessage(id, (prevText: string) => prevText + chunkValue)
      }

      // clean up
      setIsMessageUpdating(false)
      setInput('')

      setTimeout(() => {
        textAreaRef.current?.focus()
      }, 10)
    },
    onError: (error, message) => {
      console.log('error', error)

      toast.error('Something went wrong. Please try again.')
      removeMessage(message.id)
      textAreaRef.current?.focus()

    }
  })

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()

      const message = {
        id: nanoid(),
        isUserInput: true,
        text: input,
      }

      sendMessage(message)
    }
  }

  const classnames = cn('border-t border-zinc-300', className)

  return <div {...props} className={classnames}>
    <div className='relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none'>
      <TextareaAutosize
        ref={textAreaRef}
        rows={2}
        maxRows={4}
        autoFocus
        onChange={handleChangeInput}
        onKeyDown={handleKeyDown}
        value={input}
        disabled={isLoading}
        placeholder='Write a message...'
        className='peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6'
      />

      <div className='absolute inset-y-0 right-0 flex py-1.5 pr-1.5'>
        <kbd className='inline-flex items-center rounded border bg-white border-gray-200 px-1 font-sans text-xs text-gray-400 w-6 h-6'>
          {isLoading ? <Loader2 className='w-3 h-3 animate-spin' /> : <CornerDownLeft className='w-6 h-6' />}
        </kbd>
      </div>

      <div
        aria-hidden={true}
        className='absolute inset-x-0 bottom-0 border-top border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600'
      />
    </div>
  </div>
}

// 2:24:00

export default ChatInput
