import Grid from '@mui/material/Grid'
import { ReactElement } from 'react'

import { Blog } from '../../src/types/apiResponse'
import Sidebar from '../Sidebar'

type NestedLayoutProps = {
  readonly children: ReactElement
  contents: Blog[]
}

export default function NestedLayout({ children, contents }: NestedLayoutProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        {children}
      </Grid>
      <Grid item xs={12} md={4}>
        <Sidebar contents={contents} />
      </Grid>
    </Grid>
  )
}
