import { createTheme } from '@mui/material'
import { lightBlue, red } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: lightBlue[500],
    },
    secondary: {
      main: lightBlue[200],
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme
