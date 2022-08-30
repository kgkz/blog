import { InferGetStaticPropsType } from 'next'
import fs from 'fs'

import NestedLayout from '../components/layout/nestedLayout'
import Markdown from '../components/markdown'
import { getDataForLayout } from '../lib/utils'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const contents = fs.readFileSync(process.cwd() + '/docs/privacy.md', 'utf8')

  const { blogs, categories, tags, author } = await getDataForLayout()

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

export default function Privacy({ blogs, categories, tags, author, contents }: Props) {
  return (
    <NestedLayout blogs={blogs} categories={categories} tags={tags} author={author}>
      <Markdown markdown={contents} />
    </NestedLayout>
  )
}
