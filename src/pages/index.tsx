import Head from 'next/head'
// eslint-disable-next-line no-restricted-imports
import React from 'react'

import { Container } from '@/components/Container/index'
import { RenderedAt } from '@/components/RenderedAt/index'
import { RenderIcon } from '@/components/RenderIcon/index'
import { RenderNav } from '@/components/RenderNav/index'

const Home = () => {
  return (
    <>
      <Head>
        <title>next Rendering demo</title>
      </Head>
      <Container>
        <RenderIcon />
        <RenderedAt />
        <RenderNav />
      </Container>
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default Home
