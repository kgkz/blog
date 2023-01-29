import NextLink from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

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
import imageLoader from '../lib/imageLoader'

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
      <Box borderBottom={1} borderTop={1} sx={{ mb: 5, py: 2, pl: 2 }}>
        <Box>
          <Box display={'flex'}>
            <CategoryIcon fontSize="large" />
            <Typography color="action" sx={{ mt: 0.4, ml: 0.5 }}>
              Category
            </Typography>
          </Box>
          <List>
            {categories ? (
              categories.map((category, index) => {
                return (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemButton
                      component={NextLink}
                      href={`/categories/${category.id}`}
                      sx={{ pl: 0 }}
                    >
                      <ListItemIcon sx={{ minWidth: 0 }}>
                        <ChevronRightIcon />
                      </ListItemIcon>
                      <ListItemText primary={category.name} />
                    </ListItemButton>
                  </ListItem>
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
            <Typography color="action" sx={{ mt: 0.3, ml: 0.5 }}>
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
              pl: 0,
            }}
          >
            {tags ? <CategoryTags tags={tags} fontSize="1rem" /> : <></>}
          </Box>
          <Box sx={{ mt: 3 }}>
            <Box display={'flex'}>
              <CalendarMonthIcon fontSize="large" />
              <Typography color="action" sx={{ mt: 0.6, ml: 0.5 }}>
                Archive
              </Typography>
            </Box>
            <List>
              {Array.from(monthlyIndex).map(([month, group], index) => {
                return (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemButton
                      component={NextLink}
                      href={`/archive/${month}`}
                      sx={{ pl: 0, py: 0 }}
                    >
                      <ListItemIcon sx={{ minWidth: 0 }}>
                        <ChevronRightIcon />
                      </ListItemIcon>
                      <ListItemText primary={`${month} (${group.length})`} />
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
          </Box>
        </Box>
      </Box>
      {author ? (
        <Card>
          <CardMedia sx={{ position: 'relative', overflow: 'hidden', height: '10rem' }}>
            <Image
              alt="my profile image"
              src={author.image.url}
              loader={imageLoader}
              fill
              quality={30}
              priority
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom sx={{ textAlign: 'center' }}>
              {author.name}
            </Typography>
            <Typography color="text.secondary" variant="caption">
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
    </>
  )
}
