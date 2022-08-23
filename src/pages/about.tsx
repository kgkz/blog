import { InferGetStaticPropsType } from 'next'
import fs from 'fs'

import NestedLayout from '../components/layout/nestedLayout'
import Markdown from '../components/markdown'
import { apiClient } from '../lib/api-client'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const contents = fs.readFileSync(process.cwd() + '/docs/about.md', 'utf8')

  const blogs = await apiClient.blogs.$get({
    query: {
      fields: 'id,title,updatedAt,description,ogimage,publishedAt,tag,category',
      limit: 3000,
    },
  })
  const categories = await apiClient.categories.$get()
  const tags = await apiClient.tags.$get()
  const author = await apiClient.authors.$get()

  return {
    props: {
      blogs: blogs.contents,
      categories: categories.contents,
      tags: tags.contents,
      author: author.contents[0],
      contents: contents,
    },
  }
}

export default function About({ blogs, categories, tags, author, contents }: Props) {
  return (
    <NestedLayout blogs={blogs} categories={categories} tags={tags} author={author}>
      <Markdown markdown={contents} />
    </NestedLayout>
  )
}
