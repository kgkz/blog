import {
  Divider,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@mui/material'
import { Blog } from '../src/types/apiResponse'

type MainProps = {
  title: string
  contents: Blog[]
}

export default function Main(props: MainProps) {
  const { title, contents } = props

  return (
    // <Grid item xs={12} md={8} sx={{}}>
    //   <Typography variant="h6" gutterBottom>
    //     {title}
    //   </Typography>
    //   <Divider />
    //   <Grid>
    //   {contents.map((content, index) => (
    //     <Typography key={index}>{content.title}</Typography>
    //   ))}
    //   </Grid>
    // </Grid>
    <>
      {contents.map((content, index) => {
        return (
          <Grid item key={index} xs={12} md={6}>
            <CardActionArea component="a" href={`/posts/${content.id}`}>
              <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h2" variant="h5">
                    {content.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {content.updatedAt}
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
          </Grid>
        )
      })}
    </>
  )
}
