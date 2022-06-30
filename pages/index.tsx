import type { GetStaticProps, NextPage } from 'next'
import { Container, Grid } from '@mui/material'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Main from '../components/Main'
import { Blog } from '../src/types/apiResponse'
import { apiClient } from '../src/lib/api-client'

interface Props {
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

export const getStaticProps: GetStaticProps = async () => {
  const data = await apiClient.blog.$get()
  return {
    props: { ...data },
  }
}

const Home: NextPage<Props> = props => {
  const { contents } = props
  return (
    <>
      <Container maxWidth="lg">
        <Header title="kgkz" sections={sections} />
        <main>
          <Grid container spacing={4}>
            <Main title="my posts" contents={contents} />
          </Grid>
        </main>
      </Container>
      <Footer title="atodenanikakaku" description="syousaihakotira" />
    </>
  )
}

export default Home
