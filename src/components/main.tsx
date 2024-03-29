import NextLink from 'next/link'

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'

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
                {/* TODO: Imageコンポーネントへの変更 */}
                <CardMedia
                  component="img"
                  sx={{ height: 200, boarderRadius: 40 }}
                  src={`${blog.ogimage?.url}?txt=${blog.title}&txt-size=30&txt-pad=100&txt-align=bottom,right&txt-fit=max&txtfont=Hiragino%20Sans%20W3`}
                  alt={blog.description}
                />
                <CardContent>
                  <Typography
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
                      <CategoryTags tags={blog.tag} anker={false} fontSize="0.8rem" />
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
