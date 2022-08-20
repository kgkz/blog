import NextLink from 'next/link'
import Chip from '@mui/material/Chip'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { Tag } from '../src/types/apiResponse'

type CategoryTagsProps = {
  tags: Tag[]
}

export default function CategoryTags({ tags }: CategoryTagsProps) {
  return (
    <>
      {tags.map((tag, index) => {
        return (
          <NextLink key={index} href={`/tags/${tag.id}`} passHref>
            <Chip
              label={tag.name}
              icon={<LocalOfferIcon />}
              color="secondary"
              variant="outlined"
              clickable
              size="small"
            />
          </NextLink>
        )
      })}
    </>
  )
}
