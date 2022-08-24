import NextLink from 'next/link'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'

import CategoryIcon from '@mui/icons-material/CategoryOutlined'
import LocalOfferIcon from '@mui/icons-material/LocalOfferOutlined'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonthOutlined'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TwitterIcon from '@mui/icons-material/Twitter'
import GitHubIcon from '@mui/icons-material/GitHub'

import { groupByDate } from '../lib/utils'
import { Author, Blog, Category, Tag } from '../types/apiResponse'
import CategoryTags from './categoryTags'
import Toc from './toc'

type SidebarProps = {
  blogs: Blog[]
  categories?: Category[]
  tags?: Tag[]
  author?: Author
  contents?: string
}

export default function Sidebar({ blogs, categories, tags, author, contents }: SidebarProps) {
  const monthlyIndex = groupByDate(blogs)
  return (
    <>
      <Box borderBottom={1} borderTop={1} sx={{ mb: 5, py: 2 }}>
        <Box>
          <Box display={'flex'}>
            <CategoryIcon fontSize="large" />
            <Typography variant="h6" color="action" sx={{ mt: 0.4 }}>
              Category
            </Typography>
          </Box>
          <List>
            {categories ? (
              categories.map((category, index) => {
                return (
                  <NextLink key={index} href={`/categories/${category.id}`} passHref>
                    <ListItem>
                      <ListItemButton>
                        <ListItemIcon sx={{ minWidth: 0 }}>
                          <ChevronRightIcon />
                        </ListItemIcon>
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
        <Box>
          <Box display={'flex'}>
            <LocalOfferIcon fontSize="large" />
            <Typography variant="h6" color="action" sx={{ mt: 0.3 }}>
              Tag
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              listStyle: 'none',
              gap: 1.5,
              mt: 2,
              pl: 4.5,
            }}
          >
            {tags ? <CategoryTags tags={tags} /> : <></>}
          </Box>
          <Box sx={{ mt: 3 }}>
            <Box display={'flex'}>
              <CalendarMonthIcon fontSize="large" />
              <Typography variant="h6" color="action" sx={{ mt: 0.6 }}>
                Archive
              </Typography>
            </Box>
            <List>
              {Array.from(monthlyIndex).map(([month, group], index) => {
                return (
                  <NextLink key={index} href={`/archive/${month}`} passHref>
                    <ListItem>
                      <ListItemButton>
                        <ListItemIcon sx={{ minWidth: 0 }}>
                          <ChevronRightIcon />
                        </ListItemIcon>
                        <ListItemText primary={`${month} (${group.length})`} />
                      </ListItemButton>
                    </ListItem>
                  </NextLink>
                )
              })}
            </List>
          </Box>
        </Box>
      </Box>
      {author ? (
        <Card>
          <CardMedia component="img" alt="my profile image" height="140" image={author.image.url} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
              {author.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {author.text}
            </Typography>
          </CardContent>
          <CardActions>
            <Box
              component="a"
              href="https://github.com/kgkz"
              target="_blank"
              rel="noreferrer noopener"
            >
              <IconButton aria-label="github link">
                <GitHubIcon />
              </IconButton>
            </Box>
            <Box
              component="a"
              href="https://twitter.com/kzpocco"
              target="_blank"
              rel="noreferrer noopener"
            >
              <IconButton aria-label="twitter link">
                <TwitterIcon />
              </IconButton>
            </Box>
          </CardActions>
        </Card>
      ) : (
        <></>
      )}
      {contents ? (
        <Box display={{ xs: 'none', md: 'block' }} sx={{ position: 'sticky', top: 50, mt: 5 }}>
          <Toc contents={contents} />
        </Box>
      ) : (
        <></>
      )}
    </>
  )
}
