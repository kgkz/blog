import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Box,
} from '@mui/material'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import Create from '@mui/icons-material/Create'
import Autorenew from '@mui/icons-material/Autorenew'
import NextLink from 'next/link'
import { formatDate } from '../src/lib/utils'
import { Blog } from '../src/types/apiResponse'

type MainProps = {
  blogs: Blog[]
}

export default function Main({ blogs }: MainProps) {
  return (
    <>
      {blogs.map((blog, index) => {
        return (
          <Grid item key={index} xs={12} md={6}>
            <NextLink href={`/posts/${blog.id}`} passHref>
              <CardActionArea component="a">
                <Card sx={{ maxWidth: 350 }}>
                  <CardMedia
                    component="img"
                    sx={{ height: 200, boarderRadius: 40 }}
                    src={blog.ogimage?.url}
                    alt={blog.description}
                  />
                  <CardContent>
                    <Typography gutterBottom component="div" variant="h5">
                      {blog.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        width: 330,
                        height: 30,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'noWrap',
                      }}
                    >
                      {blog.description}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        gap: 1.5,
                        mt: 2,
                      }}
                    >
                      {blog.tag.length ? (
                        blog.tag.map((_, index) => (
                          <Chip
                            key={index}
                            label={_.name}
                            icon={<LocalOfferIcon />}
                            color="secondary"
                            variant="outlined"
                            size="small"
                          />
                        ))
                      ) : (
                        <></>
                      )}
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'right',
                        flexWrap: 'wrap',
                        mt: 2.5,
                      }}
                    >
                      {blog?.publishedAt ? (
                        <Box component="span" sx={{ mr: 0.5 }}>
                          <Create fontSize="inherit" />
                          <Typography
                            sx={{ mx: 0.5 }}
                            variant="subtitle2"
                            component="span"
                            color="text.secondary"
                          >
                            {formatDate(blog.publishedAt, 'YYYY/MM/DD')}
                          </Typography>
                        </Box>
                      ) : (
                        <></>
                      )}
                      {blog.updatedAt !== blog.publishedAt ? (
                        <Box component="span" sx={{ ml: 0.5 }}>
                          <Autorenew fontSize="inherit" />
                          <Typography
                            sx={{ mx: 0.5 }}
                            variant="subtitle2"
                            component="span"
                            color="text.secondary"
                          >
                            {formatDate(blog.updatedAt, 'YYYY/MM/DD')}
                          </Typography>
                        </Box>
                      ) : (
                        <></>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </CardActionArea>
            </NextLink>
          </Grid>
        )
      })}
    </>
  )
}
