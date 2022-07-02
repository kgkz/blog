import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Box from '@mui/material/Grid'

import { apiClient } from '../../src/lib/api-client'
import Markdown from '../../components/Markdown'
import NestedLayout from '../../components/layout/NestedLayout'

type ArticleDetailProps = InferGetStaticPropsType<typeof getStaticProps> & { errors?: string }

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await apiClient.blog.$get({ query: { limit: 3000 } })
  const paths = data.contents.map(content => ({ params: { id: content.id } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context

  try {
    const blog = await apiClient.blog.$get({ query: { ids: params?.id } })
    const blogs = await apiClient.blog.$get({
      query: { fields: 'id,title,updatedAt,description,ogimage,publishedAt', limit: 3000 },
    })
    const categories = await apiClient.categories.$get()
    const tags = await apiClient.tags.$get()

    return {
      props: {
        blog: blog.contents.shift(),
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

export default function ArticleDetail({ blog, blogs, categories, tags }: ArticleDetailProps) {
  if (!blog || !blogs) return
  return (
    <NestedLayout blogs={blogs} categories={categories} tags={tags}>
      <Box
        sx={{
          '& blockquote': {
            px: 2,
            borderLeft: 2,
            borderColor: 'grey.500',
          },
        }}
      >
        <Markdown markdown={blog.body} />
      </Box>
    </NestedLayout>
  )
}
