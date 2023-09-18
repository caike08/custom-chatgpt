// Next.js has a file based routing structure, which means that if you create directories 
// and files inside "app" folder, it will be represented as URLs on the website.
//

import Header from '@/components/Header/Header'
import Content from '@/components/Content/Content'
import Footer from '@/components/Footer/Footer'

// page is a reserved name in Next.js. It defines which component is displayed in the URL.
export default function Home() {
  return (
    <main className='relative flex flex-col justify-center items-center h-screen'>
      <Header />
      <Content />
      <Footer />
    </main>
  )
}
