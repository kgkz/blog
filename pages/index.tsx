import type { InferGetStaticPropsType, NextPage } from 'next'
import Grid from '@mui/material/Grid'

import Main from '../components/Main'
import { apiClient } from '../src/lib/api-client'
import NestedLayout from '../components/layout/NestedLayout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
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
    <NestedLayout contents={contents}>
      <Grid container spacing={4}>
        <Main title="my posts" contents={contents} />
      </Grid>
    </NestedLayout>
  )
}

export default Home
