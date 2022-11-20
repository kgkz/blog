import { InferGetStaticPropsType } from 'next'
import Form from '../components/form'

import Layout from '../components/layout/layout'
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
    <Layout blogs={blogs} categories={categories} tags={tags} author={author}>
      <Form />
    </Layout>
  )
}
