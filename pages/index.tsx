import type { GetStaticProps, NextPage } from 'next'
import { Container, Grid } from '@mui/material'

import Main from '../components/Main'
import { Blog } from '../src/types/apiResponse'
import { apiClient } from '../src/lib/api-client'

type Props = {
  contents: Blog[]
}

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
        <main>
          <Grid container spacing={4}>
            <Main title="my posts" contents={contents} />
          </Grid>
        </main>
      </Container>
    </>
  )
}

export default Home
