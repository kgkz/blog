import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Grid from '@mui/material/Grid'

import { apiClient } from '../../lib/api-client'
import NestedLayout from '../../components/layout/nestedLayout'
import Main from '../../components/main'

type Props = InferGetStaticPropsType<typeof getStaticProps> & { errors?: string }

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await apiClient.categories.$get()
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
        filters: `category[equals]${params?.id}`,
        fields: 'id,title,updatedAt,description,ogimage,publishedAt,tag,category',
      },
    })
    const blogs = await apiClient.blogs.$get({
      query: {
        fields: 'id,title,updatedAt,description,ogimage,publishedAt,tag,category',
        limit: 3000,
      },
    })
    const categories = await apiClient.categories.$get()
    const tags = await apiClient.tags.$get()

    return {
      props: {
        filterdBlogs: filterdBlogs.contents,
        blogs: blogs.contents,
        categories: categories.contents,
        tags: tags.contents,
      },
    }
  } catch (err) {
    if (err instanceof Error) {
      return { props: { errors: err.message } }
    }
    return { props: { errors: 'Unknown error' } }
  }
}

export default function CategoriesId({ filterdBlogs, blogs, categories, tags }: Props) {
  if (!filterdBlogs || !blogs) return
  return (
    <NestedLayout blogs={blogs} categories={categories} tags={tags}>
      <Grid container spacing={4}>
        <Main blogs={filterdBlogs} />
      </Grid>
    </NestedLayout>
  )
}
