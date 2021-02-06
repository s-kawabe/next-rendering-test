import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import { Layout } from '@/layouts/layout'

const App = (props: AppProps) => {
  return (
    <ChakraProvider>
      <Layout {...props.pageProps}>
        <props.Component {...props.pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default App
