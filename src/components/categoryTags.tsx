import NextLink from 'next/link'
import Chip from '@mui/material/Chip'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { Tag } from '../types/apiResponse'

type CategoryTagsProps = {
  tags: Tag[]
  anker?: boolean
}

export default function CategoryTags({ tags, anker = true }: CategoryTagsProps) {
  return (
    <>
      {tags.map((tag, index) => {
        return (
          <Chip
            component={anker ? NextLink : 'div'}
            key={index}
            href={`/tags/${tag.id}`}
            label={tag.name}
            icon={<LocalOfferIcon />}
            color="secondary"
            variant="outlined"
            clickable
            size="small"
          />
        )
      })}
    </>
  )
}
