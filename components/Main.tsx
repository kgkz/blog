import { Divider, Typography, Grid } from '@mui/material'
import { GetStaticProps, NextPage } from 'next'
import { apiClient } from '../src/lib/api-client'
import { Blog } from '../src/types/apiResponse'

interface MainProps {
  title: string
  posts: Blog[]
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await apiClient.blog.$get()
  return {
    props: { ...data },
  }
}

export default function Main(props: MainProps) {
  const { title, posts } = props

  return (
    <Grid item xs={12} md={8} sx={{}}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map((post, index) => (
        <Typography key={index}>{post.title}</Typography>
      ))}
    </Grid>
  )
}
