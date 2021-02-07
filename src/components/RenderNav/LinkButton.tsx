import { Button, Flex } from '@chakra-ui/react'
import Link from 'next/link'

export type LinkButtonProps = {
  text: string
  href: string
  color: 'teal' | 'orange' | 'yellow' | 'green'
}

export const LinkButton = (props: LinkButtonProps) => {
  return (
    <Link href={props.href}>
      <Flex>
        <Button colorScheme={props.color} ml={5}>
          <span>{props.text}</span>
        </Button>
      </Flex>
    </Link>
  )
}
