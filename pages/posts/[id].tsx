import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'
import { apiClient } from '../../src/lib/api-client'
import { Blog } from '../../src/types/apiResponse'

type Props = {
  blog?: Blog[]
  errors?: string
}

const BlogId = ({ blog }: Props) => {
  if (!blog) return
  return <div>{blog[0].title}</div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await apiClient.blog.$get()
  const paths = data.contents.map(content => ({ params: { id: content.id } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const data = await apiClient.blog.$get({ query: { ids: params?.id } })
    return {
      props: { blog: { ...data.contents } },
    }
  } catch (err) {
    if (err instanceof Error) {
      return { props: { errors: err.message } }
    }
    return { props: { errors: 'Unknown error' } }
  }
}

export default BlogId
