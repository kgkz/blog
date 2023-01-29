import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Box from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { JSDOM } from 'jsdom'

import { apiClient } from '../../lib/api-client'
import Layout from '../../components/layout/layout'
import CategoryTags from '../../components/categoryTags'
import DateTag from '../../components/dateTag'
import { getDataForLayout } from '../../lib/utils'
import 'highlight.js/styles/tokyo-night-dark.css'
import Markdown from '../../components/markdown'
import Toc from '../../components/toc'
import { LinkContent } from '../../types/apiResponse'

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

    const lines = blog?.contents[0].body.split('\n')
    const targetLines = lines
      ?.filter(line => line.match(new RegExp(/^https:/)))
      .map((line: string): LinkContent => {
        return {
          url: line,
          title: '',
          image: '',
          description: '',
        }
      })

    const getGCP = async (line: LinkContent) => {
      if (!line.url) {
        return line
      }
      const text = await fetch(line.url).then(res => res.text())
      const metas = new JSDOM(text).window.document.querySelectorAll('meta')
      metas.forEach(meta => {
        const content = meta.getAttribute('content')
        if (!content) {
          return
        }
        const name = meta.getAttribute('name')
        const property = meta.getAttribute('property')
        if (name?.includes('description')) {
          line.description = content
        }
        if (name === 'title' || property === 'og:title') {
          line.title = content
        }
        if (property === 'og:image') {
          line.image = content
        }
      })
      return line
    }

    const linkContents = targetLines
      ? await Promise.all(targetLines.map(line => getGCP(line)))
      : undefined

    return {
      props: {
        blog: blog?.contents.shift(),
        blogs: blogs.contents,
        categories: categories.contents,
        tags: tags.contents,
        author: author.contents[0],
        linkContents: linkContents,
      },
    }
  } catch (err) {
    if (err instanceof Error) {
      return { props: { errors: err.message } }
    }
    return { props: { errors: 'Unknown error' } }
  }
}

export default function PostsId({ blog, blogs, categories, tags, author, linkContents }: Props) {
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
      <Box component="article">
        <Typography component="h1" variant="h1">
          {blog.title}
        </Typography>
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
        {/* TODO: Imageコンポーネントへの変更 */}
        <Box
          component="img"
          sx={{ width: '100%', height: 'auto', borderRadius: 4, mb: 1 }}
          alt={blog.description}
          src={`${blog.ogimage?.url}?txt=${blog.title}&txt-size=50&txt-pad=50&txt-align=bottom,right&txt-fit=max&txtfont=Hiragino%20Sans%20W3`}
        />
        <Toc />
        <Box className="postsContent" sx={{ textAlign: 'justify' }}>
          <Markdown markdown={blog.body} linkContents={linkContents} />
        </Box>
      </Box>
    </Layout>
  )
}
