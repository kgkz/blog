import type { InferGetStaticPropsType, NextPage } from 'next'
import Grid from '@mui/material/Grid'

import Main from '../components/main'
import { apiClient } from '../lib/api-client'
import NestedLayout from '../components/layout/nestedLayout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const blogs = await apiClient.blogs.$get({
    query: {
      fields: 'id,title,updatedAt,description,ogimage,publishedAt,tag,category',
      limit: 3000,
    },
  })
  const categories = await apiClient.categories.$get()
  const tags = await apiClient.tags.$get()
  const author = await apiClient.authors.$get()

  return {
    props: {
      blogs: blogs.contents,
      categories: categories.contents,
      tags: tags.contents,
      author: author.contents[0],
    },
  }
}

const Home: NextPage<Props> = ({ blogs, categories, tags, author }) => {
  return (
    <NestedLayout blogs={blogs} categories={categories} tags={tags} author={author}>
      <Grid container spacing={4}>
        <Main blogs={blogs} />
      </Grid>
    </NestedLayout>
  )
}

export default Home
