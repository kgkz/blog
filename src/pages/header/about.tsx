import * as React from 'react'
import { Typography } from '@mui/material'
import { InferGetStaticPropsType } from 'next'
import { apiClient } from '../../lib/api-client'
import NestedLayout from '../../components/layout/nestedLayout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
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
    },
  }
}

export default function about({ blogs, categories, tags, author }: Props) {
  return (
    <NestedLayout blogs={blogs} categories={categories} tags={tags} author={author}>
      <Typography>about page</Typography>
    </NestedLayout>
  )
}
