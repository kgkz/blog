import Grid from '@mui/material/Grid'
import { ReactElement } from 'react'

import { Author, Blog, Category, Tag } from '../../types/apiResponse'
import Sidebar from '../sidebar'

type NestedLayoutProps = {
  readonly children: ReactElement
  blogs: Blog[]
  categories?: Category[]
  tags?: Tag[]
  author?: Author
}

export default function NestedLayout({
  children,
  blogs,
  categories,
  tags,
  author,
}: NestedLayoutProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={9}>
        {children}
      </Grid>
      <Grid item xs={12} md={3}>
        <Sidebar blogs={blogs} categories={categories} tags={tags} author={author} />
      </Grid>
    </Grid>
  )
}
