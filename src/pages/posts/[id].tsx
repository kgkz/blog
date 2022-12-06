import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Box from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { apiClient } from '../../lib/api-client'
import Layout from '../../components/layout/layout'
import Toc from '../../components/toc'
import CategoryTags from '../../components/categoryTags'
import DateTag from '../../components/dateTag'
import { getDataForLayout } from '../../lib/utils'
import 'highlight.js/styles/tokyo-night-dark.css'
import Markdown from '../../components/markdown'

type Props = InferGetStaticPropsType<typeof getStaticProps> & { errors?: string }

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await apiClient.blogs.$get({ query: { limit: 3000 } })
  const paths = data.contents.map(content => ({ params: { id: content.id } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context

  try {
    const { blog, blogs, categories, tags, author } = await getDataForLayout(params?.id)

    return {
      props: {
        blog: blog?.contents.shift(),
        blogs: blogs.contents,
        categories: categories.contents,
        tags: tags.contents,
        author: author.contents[0],
      },
    }
  } catch (err) {
    if (err instanceof Error) {
      return { props: { errors: err.message } }
    }
    return { props: { errors: 'Unknown error' } }
  }
}

export default function PostsId({ blog, blogs, categories, tags, author }: Props) {
  if (!blog || !blogs) return

  return (
    <Layout
      blog={blog}
      blogs={blogs}
      categories={categories}
      tags={tags}
      contents={blog.body}
      author={author}
    >
      <>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            {blog.title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            mt: 3,
            mb: 4,
            gap: 0.5,
          }}
        >
          <CategoryTags tags={blog.tag} />
          {blog.publishedAt ? <DateTag date={blog.publishedAt} icon="create" /> : <></>}
          {blog.updatedAt ? <DateTag date={blog.updatedAt} icon="update" /> : <></>}
        </Box>
        <Box
          component="img"
          sx={{ width: '100%', height: 'auto', borderRadius: 4, mb: 1 }}
          alt={blog.description}
          src={`${blog.ogimage?.url}?txt=${blog.title}&txt-size=50&txt-pad=50&txt-align=bottom,right&txt-fit=max&txtfont=Hiragino%20Sans%20W3`}
        />
        <Toc contents={blog.body} description={blog.description} />
        <Box component="div">
          <Markdown markdown={blog.body} />
        </Box>
      </>
    </Layout>
  )
}
