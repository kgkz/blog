import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TocIcon from '@mui/icons-material/Toc'
import AnchorLink from './anchorLink'

type TocProps = {
  contents: string
}

export default function Toc({ contents }: TocProps) {
  const h1ContentsReg = new RegExp(/^#[^#]/)
  const h1Contents = contents ? contents.split(/\r\n|\n/).filter(x => h1ContentsReg.test(x)) : []

  return (
    <Box borderTop={1} borderBottom={1}>
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
        <TocIcon fontSize="large" />
        <Typography variant="h5" component={'span'} sx={{ ml: 1 }}>
          目次
        </Typography>
      </Box>
      <Box
        component="ol"
        sx={{
          padding: 0,
          marfin: 0,
          listStyle: 'none',
          fontSize: 22,
        }}
      >
        {h1Contents.map((h1, index) => (
          <Box
            component="li"
            key={index}
            sx={{
              counterIncrement: 'section',
              my: 1,
              pl: 2,
              '&::before': {
                content: 'counter(section)',
                pr: 2,
              },
            }}
          >
            <AnchorLink to={{ hash: h1.slice(2) }} anchor={h1.slice(2)}>
              {h1.slice(2)}
            </AnchorLink>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
