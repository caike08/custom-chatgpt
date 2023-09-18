'use client'
import { useState } from 'react'
import { Menu, LogIn, X } from 'lucide-react'
import Image from 'next/image'

import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Contact', href: '#' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  return (
    <header className='fixed inset-x-0 top-0 z-50'>
      <nav className='flex items-center justify-between p-6 lg:px-8' aria-label='Global'>
        <div className='flex lg:flex-0'>
          <a href='#' className='-m-1.5 p-1.5'>
            <span className='sr-only text-gray-500'>NextJS + Tailwind + OpenAI</span>
            <Image
              src='/classic_computer.png'
              alt=''
              width={32}
              height={32}
            />
          </a>
        </div>
        <div className='flex lg:hidden lg:flex-1'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Menu className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <div className='hidden lg:flex lg:gap-x-12 lg:flex-1 items-center justify-center'>
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className='text-sm font-semibold leading-6 text-gray-300'>
              {item.name}
            </a>
          ))}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <DialogContent>
          <div className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
            <div className='flex items-center justify-between'>
              <a href='#' className='-m-1.5 p-1.5'>
                <span className='sr-only text-gray-500'>NextJS + Tailwind + OpenAI</span>
                <Image
                  src='/classic_computer.png'
                  alt=''
                  width={32}
                  height={32}
                />
              </a>
              <button
                type='button'
                className='-m-2.5 rounded-md p-2.5 text-gray-700'
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className='sr-only'>Close menu</span>
                <X className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            <div className='mt-6 flow-root'>
              <div className='-my-6 divide-y divide-gray-500/10'>
                <div className='space-y-2 py-6'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className='-mx-3 flex rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  )
}

