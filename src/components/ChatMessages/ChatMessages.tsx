'use client'
import { FC, useContext } from 'react'

import { MessagesContext } from '@/context/messages'
import LinkHandler from '@/components/LinkHandler/LinkHandler'
import { cn } from '@/libs/utils'

interface ChatMessagesProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props}) => {
  const {messages} = useContext(MessagesContext)

  // revert message orders
  const invertedMessages = [...messages]

  const classes = cn(
    'overflow-y-auto flex flex-col-reverse gap-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch',
    className
  )

  return (
    <div className={classes} {...props}>
      <div className='flex flex-col flex-1 flex-grow gap-2'>
        {invertedMessages.map((message) => (
          <div key={message.id} className='chat-message'>
            <div className={cn('flex gap-2 items-end', {
              'justify-end': message.isUserInput,
            })}>
              <div className={cn('flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden rounded', {
                'order-1 items-end': message.isUserInput,
                'order-2 items-start': !message.isUserInput,
              })}>
                <p className={cn('px-4 py-2 rounded-lg', {
                  'bg-blue-600 text-white': message.isUserInput,
                  'bg-gray-200 text-gray-900': !message.isUserInput,
                })}>
                  <LinkHandler text={message.text} />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatMessages
