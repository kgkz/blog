import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import NextLink from 'next/link'

type FooterProps = {}

export default function Footer({}: FooterProps) {
  return (
    <Typography
      component="footer"
      variant="caption"
      sx={{
        bgcolor: 'bacaground.paper',
        py: 6,
        textAlign: 'center',
      }}
    >
      <Link href="/privacy" component={NextLink} color="text.secondary" underline="hover">
        プライバシーポリシー
      </Link>
      <Box sx={{ mt: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          Copyright © kgkz
        </Typography>
      </Box>
    </Typography>
  )
}
