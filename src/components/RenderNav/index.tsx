import { Flex } from '@chakra-ui/react'
import type { LinkButtonProps } from 'src/components/RenderNav/LinkButton'
import { LinkButton } from 'src/components/RenderNav/LinkButton'

const renderLinks: LinkButtonProps[] = [
  { text: 'CSR', href: '/rendering/csr', color: 'teal' },
  { text: 'SSR', href: '/rendering/ssr', color: 'orange' },
  { text: 'SSG', href: '/rendering/ssg', color: 'yellow' },
  { text: 'ISR', href: '/rendering/isr', color: 'green' },
]

export const RenderNav = () => {
  return (
    <Flex>
      {renderLinks.map((link) => {
        return <LinkButton key={link.text} {...link} />
      })}
    </Flex>
  )
}
