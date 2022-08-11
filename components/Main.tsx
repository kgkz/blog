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
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    sx={{ height: 170, boarderRadius: 30 }}
                    src={blog.ogimage?.url}
                    alt={blog.description}
                  />
                  <CardContent>
                    <Typography component="h2" variant="h5">
                      {blog.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        maxWidth: 'inherit',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'noWrap',
                      }}
                    >
                      {blog.description}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {formatDate(blog.updatedAt, 'YYYY/MM/DD')}
                    </Typography>
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
                </Card>
              </CardActionArea>
            </NextLink>
          </Grid>
        )
      })}
    </>
  )
}
