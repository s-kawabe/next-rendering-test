import { Flex } from '@chakra-ui/react'
import type { LinkButtonProps } from 'src/components/RenderNav/LinkButton'
import { LinkButton } from 'src/components/RenderNav/LinkButton'

const renderLinks: LinkButtonProps[] = [
  { text: 'CSR', href: '/rendering/csr' },
  { text: 'SSR', href: '/rendering/ssr' },
  { text: 'SSG', href: '/rendering/ssg' },
  { text: 'ISR', href: '/rendering/isr' },
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
