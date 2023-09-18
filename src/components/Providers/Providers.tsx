'use client'
import { FC, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { MessagesProvider } from '@/context/messages'

interface ProvidersProps {
  children: ReactNode
}

/* We need to provide something called "query client provider" in order to use react-query across the application.
 * However, "query client provider" is a context, and because app/layout.tsx is a server component, we cannot put a
 * context provider in it. 
 * This client component should encapsulate all the context providers we have in our application.
 */

const Providers: FC<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <MessagesProvider>
        {children}
      </MessagesProvider>
    </QueryClientProvider>
  )
}

export default Providers
