import { Typography, Grid, Card, CardActionArea, CardContent, CardMedia } from '@mui/material'
import NextLink from 'next/link'
import { formatDate } from '../src/lib/utils'
import { Blog } from '../src/types/apiResponse'

type MainProps = {
  title: string
  contents: Blog[]
}

export default function Main(props: MainProps) {
  const { title, contents } = props

  return (
    <>
      {contents.map((content, index) => {
        return (
          <Grid item key={index} xs={12} md={6}>
            <NextLink href={`/posts/${content.id}`} passHref>
              <CardActionArea component="a">
                <Card sx={{ display: 'flex' }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                      {content.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {formatDate(content.updatedAt, 'YYYY/MM/DD')}
                    </Typography>
                    <Typography variant="subtitle1">{content.description}</Typography>
                    <Typography variant="subtitle1" color="primary">
                      Continue reading...
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                    src={content.ogimage?.url}
                    alt={content.description}
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
