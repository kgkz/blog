import Typography from '@mui/material/Typography'
import Create from '@mui/icons-material/Create'
import Autorenew from '@mui/icons-material/Autorenew'
import { formatDate } from '../lib/utils'

type DateTagProps = {
  date: string
  icon?: 'create' | 'update'
}

export default function DateTag({ date, icon }: DateTagProps) {
  return (
    <>
      {icon === 'create' ? (
        <Create fontSize="inherit" />
      ) : icon === 'update' ? (
        <Autorenew fontSize="inherit" />
      ) : (
        <></>
      )}
      <Typography variant="subtitle2" component="span" color="text.secondary">
        {formatDate(date, 'YYYY/MM/DD')}
      </Typography>
    </>
  )
}
