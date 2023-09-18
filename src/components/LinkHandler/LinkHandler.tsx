import { FC, Fragment } from 'react'
import Link from 'next/link'

interface LinkHandlerProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
}

const LinkHandler: FC<LinkHandlerProps> = ({ text, ...props }) => {
  // regex of link
  const linkRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
  const parts = []

  let lastIndex = 0
  let match

  // let's search for the links
  while ((match = linkRegex.exec(text)) !== null) {
    const [fullMatch, linkText, linkUrl] = match
    const matchStart = match.index
    const matchEnd = matchStart + fullMatch.length

    if (lastIndex < matchStart) {
      parts.push(text.slice(lastIndex, matchStart))
    }

    parts.push(
      <Link
        target='_blank'
        rel='noopener noreferrer'
        className='break-words underline underline-offset-2 text-blue-600'
        key={linkUrl}
        href={linkText}
      >
        {linkText}
      </Link>
    )

    lastIndex = matchEnd
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>{part}</Fragment>
      ))}
    </>
  )
}

export default LinkHandler
