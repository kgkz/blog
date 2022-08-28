import Box from '@mui/material/Box'
import usePagination from '@mui/material/usePagination'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

type PaginationProps = {
  pageCount?: number
  currentPage?: number
}

export default function Pagination({ pageCount, currentPage }: PaginationProps) {
  const router = useRouter()
  const { items } = usePagination({
    // count: pageCount,
    // page: currentPage,
    count: 5,
    page: 3,
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
          let children = null

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…'
          } else if (type === 'page') {
            children = (
              <button
                type="button"
                style={{
                  fontWeight: selected ? 'bold' : undefined,
                }}
                {...item}
              >
                {page}
              </button>
            )
          } else {
            children = (
              <button type="button" {...item}>
                {type}
              </button>
            )
          }

          return (
            <Box component="li" key={index}>
              {children}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
