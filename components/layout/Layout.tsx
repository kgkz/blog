import { ReactElement } from 'react'

import Header from './Header'
import Footer from './Footer'

type LayoutProps = {
  readonly children: ReactElement
}

const sections = [
  {
    title: 'about',
    path: 'about',
  },
  {
    title: 'contact',
    path: 'contact',
  },
]

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header title="kgkz" sections={sections} />
      {children}
      <Footer title="hoge" description="fuga" />
    </>
  )
}
