import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
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
      <NextLink href="/privacy" passHref>
        <Link variant="caption" color="text.secondary" underline="hover">
          プライバシーポリシー
        </Link>
      </NextLink>
      <Box sx={{ mt: 0.5 }}>
        <Copyright />
      </Box>
    </Box>
  )
}
