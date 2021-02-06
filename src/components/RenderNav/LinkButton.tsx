import { Button, Flex } from '@chakra-ui/react'
import Link from 'next/link'

export type LinkButtonProps = {
  text: string
  href: string
}

export const LinkButton = (props: LinkButtonProps) => {
  return (
    <Link href={props.href}>
      <Flex>
        <Button colorScheme="teal" mb={5}>
          <span>{props.text}</span>
        </Button>
      </Flex>
    </Link>
  )
}
