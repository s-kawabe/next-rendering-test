import { Button, Flex } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Link from 'next/link'

export type LinkButtonProps = {
  /* in text */
  text: string
  /* in href */
  href: string
  /* pick color */
  color: 'teal' | 'orange' | 'yellow' | 'green'
}

const ShadowButton = styled(Button)`
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.5);
`

export const LinkButton = (props: LinkButtonProps) => {
  return (
    <Link href={props.href}>
      <Flex>
        <ShadowButton colorScheme={props.color} ml={5}>
          <span>{props.text}</span>
        </ShadowButton>
      </Flex>
    </Link>
  )
}
