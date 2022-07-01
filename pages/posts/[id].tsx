import { GetStaticPaths, GetStaticProps } from 'next'
import Box from '@mui/material/Grid'

import { apiClient } from '../../src/lib/api-client'
import { Blog } from '../../src/types/apiResponse'
import Markdown from '../../components/Markdown'

type ArticleDetailProps = {
  blog?: Blog
  errors?: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await apiClient.blog.$get()
  const paths = data.contents.map(content => ({ params: { id: content.id } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const data = await apiClient.blog.$get({ query: { ids: params?.id } })
    return {
      props: { blog: data.contents.shift() },
    }
  } catch (err) {
    if (err instanceof Error) {
      return { props: { errors: err.message } }
    }
    return { props: { errors: 'Unknown error' } }
  }
}

export default function ArticleDetail({ blog }: ArticleDetailProps) {
  if (!blog) return
  return (
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
  )
}
