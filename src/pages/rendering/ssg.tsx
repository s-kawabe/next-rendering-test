import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import { Container } from '@/components/Container'
import { RenderedAt } from '@/components/RenderedAt'
import { RenderIcon } from '@/components/RenderIcon'
import { RenderNav } from '@/components/RenderNav'
import { day } from '@/lib/day'

export const getStaticProps: GetStaticProps<{ date: string }> = async () => {
  return {
    props: {
      date: day().tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm:ss'),
    },
  }
}

type SsgProps = InferGetStaticPropsType<typeof getStaticProps>

const Ssg = (props: SsgProps) => {
  return (
    <>
      <Head>
        <title>SSG Rendering Demo</title>
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
export default Ssg
