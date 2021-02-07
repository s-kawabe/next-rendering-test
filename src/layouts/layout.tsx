import type { ReactNode } from 'react'
// eslint-disable-next-line no-restricted-imports
import React from 'react'

import { Footer } from '@/layouts/footer'
import { Header } from '@/layouts/header'

export const Layout = (props: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  )
}
