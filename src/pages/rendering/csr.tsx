import Head from 'next/head'
import { useEffect, useState } from 'react'
// eslint-disable-next-line no-restricted-imports
import React from 'react'

import { Container } from '@/components/Container/index'
import { RenderedAt } from '@/components/RenderedAt'
import { RenderIcon } from '@/components/RenderIcon'
import { RenderNav } from '@/components/RenderNav'
import { day } from '@/lib/day'

const Csr = () => {
  const [time, setTime] = useState('')

  useEffect(() => {
    // const randomTime = ~~(Math.random() * (1001 - 100)) + 100
    setTime(day().tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm:ss'))
  }, [])

  return (
    <>
      <Head>
        <title>CSR Rendering Demo</title>
      </Head>
      <Container>
        <RenderIcon />
        <RenderedAt time={time} render="csr" />
        <RenderNav />
      </Container>
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default Csr
