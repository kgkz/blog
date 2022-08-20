import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import NextLink from 'next/link'

import { groupByDate } from '../src/lib/utils'
import { Blog, Category, Tag } from '../src/types/apiResponse'
import CategoryTags from './categoryTags'

type SidebarProps = {
  blogs: Blog[]
  categories?: Category[]
  tags?: Tag[]
}

export default function Sidebar({ blogs, categories, tags }: SidebarProps) {
  const monthlyIndex = groupByDate(blogs)
  return (
    <>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
        <Typography variant="h6" gutterBottom>
          About
        </Typography>
        {/* ToDO ここもAPI経由の情報にする？ */}
        <Typography></Typography>
      </Paper>
      <Box sx={{ my: 3 }}>
        <Typography variant="h6" gutterBottom>
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
      <Box sx={{ my: 3 }}>
        <Typography variant="h6" gutterBottom>
          Category
        </Typography>
        <List>
          {categories ? (
            categories.map((category, index) => {
              return (
                <NextLink key={index} href={`/categories/${category.id}`} passHref>
                  <ListItem>
                    <ListItemButton>
                      <ListItemText primary={category.name} />
                    </ListItemButton>
                  </ListItem>
                </NextLink>
              )
            })
          ) : (
            <></>
          )}
        </List>
      </Box>
      <Box sx={{ my: 3 }}>
        <Typography variant="h6" gutterBottom>
          Tag
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            listStyle: 'none',
            gap: 1,
          }}
        >
          {tags ? <CategoryTags tags={tags} /> : <></>}
        </Box>
      </Box>
    </>
  )
}
