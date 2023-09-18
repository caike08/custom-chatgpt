import { FC } from 'react'

interface ChatHeaderProps {}

const ChatHeader: FC<ChatHeaderProps> = () => {
  return <div className='w-full flex flex-col gap-1 justify-center items-start text-zinc-800 text-sm'>
    <p className='text-xs'>Chat with</p>
    <div className='flex gap-2 items-center justify-start'>
      <span className='w-2 h-2 rounded-full bg-green-500' />
      <p className='font-medium'>OpenAI</p>
    </div>
  </div>
}

export default ChatHeader
