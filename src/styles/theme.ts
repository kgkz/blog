import { createTheme } from '@mui/material'
import { grey, red } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: grey[500],
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontSize: 16,
    fontFamily: 'Nota Sans JP, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 2,
      letterSpacing: '-0.035em',
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 3,
      letterSpacing: '-0.03em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '-0.025em',
    },
    body1: {
      lineHeight: 1.7,
      letterSpacing: '0.05em',
    },
    caption: {
      fontSize: '0.85rem',
    },
    button: {
      textTransform: 'none',
      fontSize: '0.85rem',
      fontWeight: 500,
    },
  },
})

export default theme
