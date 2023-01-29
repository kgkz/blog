import Image from 'next/image'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'

import { LinkContent } from '../types/apiResponse'

type OgpLinkProps = {
  readonly linkContent?: LinkContent
}

export default function OgpLink({ linkContent }: OgpLinkProps) {
  return (
    <CardActionArea href={`${linkContent?.url}`}>
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: '9rem',
            width: '32rem',
          }}
        >
          <Typography color="text.secondary" variant="subtitle1">
            {linkContent?.title}
          </Typography>
          <Typography
            color="text.secondary"
            variant="caption"
            sx={{
              height: '2rem',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {linkContent?.description}
          </Typography>
          <Typography color="text.secondary" variant="caption" sx={{ marginTop: 2 }}>
            {linkContent?.url}
          </Typography>
        </CardContent>
        <CardMedia
          sx={{
            position: 'relative',
            height: '9rem',
            width: '16rem',
          }}
        >
          <Image
            alt={linkContent?.title || linkContent?.description || ''}
            src={
              linkContent?.image ||
              'https://images.microcms-assets.io/assets/b6ac4a8d91df49e5bf670c6085140d55/4c9b1078420445cc8e8a2dc10eb41ed4/noimage.png'
            }
            quality={30}
            fill
            priority
            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
          />
        </CardMedia>
      </Card>
    </CardActionArea>
  )
}
