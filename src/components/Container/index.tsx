import { Flex } from '@chakra-ui/react'

type ContainerProps = {
  children: React.ReactNode
}

export const Container = (props: ContainerProps) => {
  return (
    <Flex direction="column" maxW={600} ml={50} justify="center">
      {props.children}
    </Flex>
  )
}
