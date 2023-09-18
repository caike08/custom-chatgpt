import React from 'react'
import { Github } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return(
    <footer className='fixed inset-x-0 bottom-0 inline-flex items-center justify-center p-4 w-full'>
      <a href='https://github.com/caike08' className='text-sm leading-6 text-gray-400 inline-flex gap-2'>
        <span>© {year} Carlos Henrique Motta <Github className='h-3 w-3 inline-flex' /></span>
      </a>
    </footer>
  )
}
