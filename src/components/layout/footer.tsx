import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import NextLink from 'next/link'

type FooterProps = {}

function Copyright() {
  return (
    <Typography variant="caption" color="text.secondary">
      Copyright © kgkz
    </Typography>
  )
}

export default function Footer({}: FooterProps) {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'bacaground.paper',
        py: 6,
        textAlign: 'center',
      }}
    >
      <Link
        href="/privacy"
        component={NextLink}
        variant="caption"
        color="text.secondary"
        underline="hover"
      >
        プライバシーポリシー
      </Link>
      <Box sx={{ mt: 0.5 }}>
        <Copyright />
      </Box>
    </Box>
  )
}
