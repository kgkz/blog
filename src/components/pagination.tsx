import Box from '@mui/material/Box'
import usePagination from '@mui/material/usePagination'

export default function Pagination() {
  const { items } = usePagination({
    count: 10,
  })

  return (
    <Box component="nav">
      <Box
        component="ul"
        sx={{ display: 'flex', justifyContent: 'center', listStyle: 'none', mb: 0 }}
      ></Box>
    </Box>
  )
}
