import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import NextLink from 'next/link'

import { groupByDate } from '../src/lib/utils'
import { Blog } from '../src/types/apiResponse'

type SidebarProps = {
  contents: Blog[]
}

export default function Sidebar({ contents }: SidebarProps) {
  const monthlyIndex = groupByDate(contents)
  return (
    <>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
        <Typography variant="h6" gutterBottom>
          About
        </Typography>
        <Typography>ここに自分の略歴を載せてみる</Typography>
      </Paper>
      <Box sx={{ p: 2, bgcolor: 'black.200' }}>
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Archives
        </Typography>
        <List>
          {Array.from(monthlyIndex).map(([month, group], index) => {
            return (
              <NextLink key={index} href={`/header/about`} passHref>
                <ListItem>
                  <ListItemButton>
                    <ListItemText primary={`${month} (${group.length})`} />
                  </ListItemButton>
                </ListItem>
              </NextLink>
            )
          })}
        </List>
      </Box>
    </>
  )
}
