import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

interface FooterProps {
  title: string
  description: string
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/header/about">
        kgkz
      </Link>
    </Typography>
  )
}

export default function Footer({ title, description }: FooterProps) {
  return (
    <Box component="footer" sx={{ bgcolor: 'bacaground.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography component="p" variant="subtitle1" align="center" color="text.secondary">
          {description}
        </Typography>
        <Copyright />
      </Container>
    </Box>
  )
}
