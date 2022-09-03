import { ReactElement } from 'react'
import Container from '@mui/material/Container'

import Header from './header'
import Footer from './footer'
import { Box } from '@mui/material'

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
    <Container maxWidth="lg">
      <Header title="でくりぷと" sections={sections} />
      <Box sx={{ my: 5 }}>{children}</Box>
      <Footer />
    </Container>
  )
}
