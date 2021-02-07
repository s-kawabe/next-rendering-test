import { BellIcon, ChatIcon } from '@chakra-ui/icons'
import { Heading, IconButton } from '@chakra-ui/react'
import Link from 'next/link'

const items = [
  { href: '/', label: 'Home', color: 'teal', icon: <ChatIcon /> },
  { href: '/about', label: 'About', color: 'green', icon: <BellIcon /> },
]

export const Header = () => {
  return (
    <header>
      <Heading m={10}>Next.js Rendering Test</Heading>
      <nav>
        {items.map(({ href, label, color, icon }) => {
          return (
            <Link key={href} href={href}>
              <IconButton ml={5} colorScheme={color} aria-label={label} size="lg" icon={icon} />
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
