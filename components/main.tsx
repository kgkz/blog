import { Typography, Grid, Card, CardActionArea, CardContent, CardMedia, Box } from '@mui/material'
import NextLink from 'next/link'
import { Blog } from '../src/types/apiResponse'
import CategoryTags from './categoryTags'
import DateTag from './dateTag'

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
                      {blog.tag.length ? <CategoryTags tags={blog.tag} /> : <></>}
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
                          <DateTag date={blog.publishedAt} icon="create" />
                        </Box>
                      ) : (
                        <></>
                      )}
                      {blog.updatedAt !== blog.publishedAt ? (
                        <Box component="span" sx={{ ml: 0.5 }}>
                          <DateTag date={blog.updatedAt} icon="update" />
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
