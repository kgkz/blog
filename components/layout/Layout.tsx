import { ReactElement } from 'react'
import Grid from '@mui/material/Grid'

import Header from './Header'
import Footer from './Footer'
import Sidebar from '../Sidebar'
import { Blog } from '../../src/types/apiResponse'

type LayoutProps = {
  readonly children: ReactElement
  contents: Blog[]
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

export default function Layout({ children, contents }: LayoutProps) {
  return (
    <>
      <Header title="kgkz" sections={sections} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          {children}
        </Grid>
        <Grid item xs={12} md={3}>
          <Sidebar contents={contents} />
        </Grid>
      </Grid>
      <Footer title="hoge" description="fuga" />
    </>
  )
}
