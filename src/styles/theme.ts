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
    button: {
      textTransform: 'none',
      fontSize: 12,
    },
  },
})

export default theme
