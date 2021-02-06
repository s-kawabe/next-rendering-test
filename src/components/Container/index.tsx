import { Flex } from '@chakra-ui/react'

type ContainerProps = {
  children: React.ReactNode
}

export const Container = (props: ContainerProps) => {
  return (
    <Flex direction="column" w="60vw" ml={50}>
      {props.children}
    </Flex>
  )
}
