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
    const data = await apiClient.blog.$get({ query: { ids: params?.id } })
    const all = await apiClient.blog.$get({
      query: { fields: 'id,title,updatedAt,description,ogimage,publishedAt', limit: 3000 },
    })

    return {
      props: { blog: data.contents.shift(), contents: all.contents },
    }
  } catch (err) {
    if (err instanceof Error) {
      return { props: { errors: err.message } }
    }
    return { props: { errors: 'Unknown error' } }
  }
}

export default function ArticleDetail({ blog, contents }: ArticleDetailProps) {
  if (!blog) return
  return (
    <NestedLayout contents={contents}>
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
