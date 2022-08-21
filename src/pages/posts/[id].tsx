import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Box from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { apiClient } from '../../lib/api-client'
import Markdown from '../../components/markdown'
import NestedLayout from '../../components/layout/nestedLayout'
import Toc from '../../components/toc'
import CategoryTags from '../../components/categoryTags'
import DateTag from '../../components/dateTag'

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
    const blog = await apiClient.blogs.$get({ query: { ids: params?.id } })
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

export default function PostsId({ blog, blogs, categories, tags }: Props) {
  if (!blog || !blogs) return

  return (
    <NestedLayout blogs={blogs} categories={categories} tags={tags}>
      <>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            {blog.title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'right', mt: 1, mb: 3, gap: 0.5 }}>
          <CategoryTags tags={blog.tag} />
          {blog.publishedAt ? <DateTag date={blog.publishedAt} icon="create" /> : <></>}
          {blog.updatedAt ? <DateTag date={blog.updatedAt} icon="update" /> : <></>}
        </Box>
        <Box
          component="img"
          sx={{ width: '100%', height: 'auto', borderRadius: 4, mb: 1 }}
          alt={blog.description}
          src={blog.ogimage?.url}
        />
        <Toc contents={blog.body} description={blog.description} />
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
      </>
    </NestedLayout>
  )
}
