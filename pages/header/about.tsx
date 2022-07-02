import * as React from 'react'
import { Typography } from '@mui/material'
import { InferGetStaticPropsType } from 'next'
import { apiClient } from '../../src/lib/api-client'
import NestedLayout from '../../components/layout/NestedLayout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const blogs = await apiClient.blog.$get({
    query: { fields: 'id,title,updatedAt,description,ogimage,publishedAt', limit: 3000 },
  })
  const categories = await apiClient.categories.$get()
  const tags = await apiClient.tags.$get()

  return {
    props: { blogs: blogs.contents, categories: categories.contents, tags: tags.contents },
  }
}

export default function about({ blogs, categories, tags }: Props) {
  return (
    <NestedLayout blogs={blogs} categories={categories} tags={tags}>
      <Typography>about page</Typography>
    </NestedLayout>
  )
}
