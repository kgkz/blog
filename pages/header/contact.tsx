import * as React from 'react'
import { InferGetStaticPropsType } from 'next'
import { Typography } from '@mui/material'

import NestedLayout from '../../components/layout/NestedLayout'
import { apiClient } from '../../src/lib/api-client'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const data = await apiClient.blog.$get({
    query: { fields: 'id,title,updatedAt,description,ogimage,publishedAt', limit: 3000 },
  })

  return {
    props: { ...data },
  }
}

export default function about({ contents }: Props) {
  return (
    <NestedLayout contents={contents}>
      <Typography>Contact page</Typography>
    </NestedLayout>
  )
}
