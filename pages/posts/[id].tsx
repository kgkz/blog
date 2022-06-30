import { ReactElement } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import ReactMarkdown from 'markdown-to-jsx'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'

import { apiClient } from '../../src/lib/api-client'
import { Blog } from '../../src/types/apiResponse'

type ArticleDetailProps = {
  blog?: Blog
  errors?: string
}

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h4',
        component: 'h1',
      },
    },
    h2: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h6', component: 'h2' },
    },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: 'subtitle1' },
    },
    h4: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'caption',
        paragraph: true,
      },
    },
    p: {
      component: Typography,
      props: { paragraph: true },
    },
    a: { component: Link },
    li: {
      component: MarkdownListItem,
    },
  },
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

function MarkdownListItem(props: any) {
  return <Box component="li" sx={{ mt: 1, typography: 'body1' }} {...props} />
}

export default function ArticleDetail({ blog }: ArticleDetailProps) {
  if (!blog) return
  return <ReactMarkdown options={options}>{blog.body}</ReactMarkdown>
}
