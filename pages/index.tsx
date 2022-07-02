import type { GetStaticProps, NextPage } from 'next'
import Grid from '@mui/material/Grid'

import Main from '../components/Main'
import { Blog } from '../src/types/apiResponse'
import { apiClient } from '../src/lib/api-client'
import Sidebar from '../components/Sidebar'

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
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Grid container spacing={4}>
          <Main title="my posts" contents={contents} />
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Sidebar contents={contents} />
      </Grid>
    </Grid>
  )
}

export default Home
