import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Grid from '@mui/material/Grid'

import { apiClient } from '../../lib/api-client'
import Layout from '../../components/layout/layout'
import Main from '../../components/main'
import { getDataForLayout } from '../../lib/utils'

type Props = InferGetStaticPropsType<typeof getStaticProps> & { errors?: string }

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await apiClient.tags.$get()
  const paths = data.contents.map(content => ({
    params: { id: content.id },
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context
  try {
    const filterdBlogs = await apiClient.blogs.$get({
      query: {
        filters: `tag[contains]${params?.id}`,
        fields: 'id,title,updatedAt,description,ogimage,publishedAt,tag,category',
      },
    })
    const { blogs, categories, tags, author } = await getDataForLayout()
    const currentTag = await apiClient.tags.$get({
      query: {
        filters: `id[equals]${params?.id}`,
      },
    })
    return {
      props: {
        filterdBlogs: filterdBlogs.contents,
        blogs: blogs.contents,
        categories: categories.contents,
        tags: tags.contents,
        author: author.contents[0],
        currentTag: currentTag.contents[0],
      },
    }
  } catch (err) {
    if (err instanceof Error) {
      return { props: { errors: err.message } }
    }
    return { props: { errors: 'Unknown error' } }
  }
}

export default function CategoriesId({
  filterdBlogs,
  blogs,
  categories,
  tags,
  author,
  currentTag,
}: Props) {
  if (!filterdBlogs || !blogs) return
  return (
    <Layout
      blogs={blogs}
      categories={categories}
      tags={tags}
      author={author}
      currentTag={currentTag.name}
    >
      <Grid container spacing={4}>
        <Main blogs={filterdBlogs} />
      </Grid>
    </Layout>
  )
}
