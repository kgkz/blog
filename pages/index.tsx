import type { GetStaticProps, NextPage } from 'next'
import { Container, Grid } from '@mui/material'

import Main from '../components/Main'
import { Blog } from '../src/types/apiResponse'
import { apiClient } from '../src/lib/api-client'
import Layout from '../components/layout/Layout'

type Props = {
  contents: Blog[]
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await apiClient.blog.$get({
    query: { fields: 'id,title,updatedAt,description,ogimage,publishedAt', limit: 3000 },
  })
  return {
    props: { ...data },
  }
}

const Home: NextPage<Props> = props => {
  const { contents } = props
  return (
    <Container maxWidth="lg">
      <Layout contents={contents}>
        <Main title="my posts" contents={contents} />
      </Layout>
    </Container>
  )
}

export default Home
