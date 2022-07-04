import * as React from 'react'
import { InferGetStaticPropsType } from 'next'
import { Typography } from '@mui/material'

import NestedLayout from '../../components/layout/NestedLayout'
import { apiClient } from '../../src/lib/api-client'

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

  return {
    props: { blogs: blogs.contents, categories: categories.contents, tags: tags.contents },
  }
}

export default function about({ blogs, categories, tags }: Props) {
  return (
    <NestedLayout blogs={blogs} categories={categories} tags={tags}>
      <Typography>Contact page</Typography>
    </NestedLayout>
  )
}
