import type { InferGetStaticPropsType, NextPage } from 'next'
import Grid from '@mui/material/Grid'

import Main from '../components/Main'
import { apiClient } from '../src/lib/api-client'
import NestedLayout from '../components/layout/NestedLayout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const blogs = await apiClient.blogs.$get({
    query: { fields: 'id,title,updatedAt,description,ogimage,publishedAt', limit: 3000 },
  })
  const categories = await apiClient.categories.$get()
  const tags = await apiClient.tags.$get()

  return {
    props: { blogs: blogs.contents, categories: categories.contents, tags: tags.contents },
  }
}

const Home: NextPage<Props> = ({ blogs, categories, tags }) => {
  return (
    <NestedLayout blogs={blogs} categories={categories} tags={tags}>
      <Grid container spacing={4}>
        <Main blogs={blogs} />
      </Grid>
    </NestedLayout>
  )
}

export default Home
