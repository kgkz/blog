import { InferGetStaticPropsType } from 'next'
import fs from 'fs'

import Layout from '../components/layout/layout'
import Markdown from '../components/markdown'
import { getDataForLayout } from '../lib/utils'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const contents = fs.readFileSync(process.cwd() + '/docs/about.md', 'utf8')
  const { blogs, categories, tags, author } = await getDataForLayout()

  return {
    props: {
      blogs: blogs.contents,
      categories: categories.contents,
      tags: tags.contents,
      author: author.contents[0],
      contents,
    },
  }
}

export default function About({ blogs, categories, tags, author, contents }: Props) {
  return (
    <Layout blogs={blogs} categories={categories} tags={tags} author={author}>
      <Markdown markdown={contents} />
    </Layout>
  )
}
