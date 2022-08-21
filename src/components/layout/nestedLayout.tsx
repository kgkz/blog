import Grid from '@mui/material/Grid'
import { ReactElement } from 'react'

import { Blog, Category, Tag } from '../../types/apiResponse'
import Sidebar from '../sidebar'

type NestedLayoutProps = {
  readonly children: ReactElement
  blogs: Blog[]
  categories?: Category[]
  tags?: Tag[]
}

export default function NestedLayout({ children, blogs, categories, tags }: NestedLayoutProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        {children}
      </Grid>
      <Grid item xs={12} md={4}>
        <Sidebar blogs={blogs} categories={categories} tags={tags} />
      </Grid>
    </Grid>
  )
}
