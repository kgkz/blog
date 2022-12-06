import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  Link,
} from '@mui/material'
import NextLink from 'next/link'
import { Blog } from '../types/apiResponse'
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
          <Grid item key={index} xs={12} md={6} width="400">
            <Card>
              <CardActionArea component={NextLink} href={`/posts/${blog.id}`}>
                <CardMedia
                  component="img"
                  sx={{ height: 200, boarderRadius: 40 }}
                  src={`${blog.ogimage?.url}?txt=${blog.title}&txt-size=50&txt-pad=50&txt-align=bottom,right&txt-fit=max&txtfont=Hiragino%20Sans%20W3`}
                  alt={blog.description}
                />
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      pl: 2,
                      width: '100%',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {blog.description}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      listStyle: 'none',
                      gap: 1,
                      mt: 2,
                      justifyContent: 'right',
                    }}
                  >
                    {blog.tag.length ? (
                      <CategoryTags tags={blog.tag} anker={false} fontSize="0.5rem" />
                    ) : (
                      <></>
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'right',
                      flexWrap: 'wrap',
                      mt: 2,
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
              </CardActionArea>
            </Card>
          </Grid>
        )
      })}
    </>
  )
}
