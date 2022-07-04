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
                <Card sx={{ display: 'flex' }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                      {blog.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {formatDate(blog.updatedAt, 'YYYY/MM/DD')}
                    </Typography>
                    <Typography variant="subtitle1">{blog.description}</Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        gap: 1,
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
                            clickable
                            size="small"
                          />
                        ))
                      ) : (
                        <></>
                      )}
                    </Box>
                  </CardContent>
                  <CardMedia
                    component="img"
                    sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                    src={blog.ogimage?.url}
                    alt={blog.description}
                  />
                </Card>
              </CardActionArea>
            </NextLink>
          </Grid>
        )
      })}
    </>
  )
}
