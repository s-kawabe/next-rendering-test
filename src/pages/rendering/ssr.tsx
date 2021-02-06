import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'

import { Container } from '@/components/Container'
import { RenderedAt } from '@/components/RenderedAt'
import { RenderIcon } from '@/components/RenderIcon'
import { RenderNav } from '@/components/RenderNav'
import { day } from '@/lib/day'

export const getServerSideProps: GetServerSideProps<{ date: string }> = async () => {
  return {
    props: {
      date: day().tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm:ss'),
    },
  }
}

type SsrProps = InferGetServerSidePropsType<typeof getServerSideProps>

const Ssr = (props: SsrProps) => {
  return (
    <>
      <Head>
        <title>SSR Rendering Demo</title>
      </Head>
      <Container>
        <RenderIcon />
        <RenderedAt time={props.date} render="ssg" />
        <RenderNav />
      </Container>
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default Ssr
