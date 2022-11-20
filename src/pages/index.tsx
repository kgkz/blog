import type { InferGetStaticPropsType, NextPage } from 'next'
import Grid from '@mui/material/Grid'

import Main from '../components/main'
import Layout from '../components/layout/layout'
import { getDataForLayout } from '../lib/utils'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const { blogs, categories, tags, author } = await getDataForLayout()

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
    <Layout blogs={blogs} categories={categories} tags={tags} author={author}>
      <Grid container spacing={4}>
        <Main blogs={blogs} />
      </Grid>
    </Layout>
  )
}

export default Home
