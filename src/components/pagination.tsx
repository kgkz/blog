import Box from '@mui/material/Box'
import usePagination from '@mui/material/usePagination'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

type PaginationProps = {
  pageCount: number
  currentPage: number
}

export default function Pagination({ pageCount, currentPage }: PaginationProps) {
  const { items } = usePagination({
    count: pageCount,
    page: currentPage,
  })

  return (
    <Box component="nav">
      <Box
        component="ul"
        sx={{
          padding: 0,
          margin: 0,
          display: 'flex',
          listStyle: 'none',
        }}
      >
        {items.map(({ page, type, selected, ...item }, index) => {
          const children = type === 'page' ? page : '...'

          return (
            <Box component="li" key={index}>
              あああ
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
