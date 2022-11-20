import { InferGetStaticPropsType } from 'next'
import Form from '../components/form'

import NestedLayout from '../components/layout/nestedLayout'
import { getDataForLayout } from '../lib/utils'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const { blogs, categories, tags, author } = await getDataForLayout()

  return {
    props: {
      blogs: blogs.contents,
      categories: categories.contents,
      tags: tags.contents,
      author: author.contents[0],
    },
  }
}

export default function Contact({ blogs, categories, tags, author }: Props) {
  return (
    <NestedLayout blogs={blogs} categories={categories} tags={tags} author={author}>
      <Form />
    </NestedLayout>
  )
}
