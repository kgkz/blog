import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TocIcon from '@mui/icons-material/Toc'
import SummarizeIcon from '@mui/icons-material/Summarize'

import AnchorLink from './anchorLink'

type TocProps = {
  contents: string
  description?: string
}

export default function Toc({ contents, description }: TocProps) {
  const h1ContentsReg = new RegExp(/^#[^#]/)
  const h1Contents = contents ? contents.split(/\r\n|\n/).filter(x => h1ContentsReg.test(x)) : []

  const font = description ? 22 : 15
  return (
    <Box borderTop={1} borderBottom={1}>
      {description ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 5 }}>
            <SummarizeIcon fontSize="large" />
            <Typography variant="h5" component={'span'} sx={{ ml: 1 }}>
              概要
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              pl: 3,
              mt: 4,
              mb: 7,
            }}
          >
            <Typography variant="h6">{description}</Typography>
          </Box>
        </>
      ) : (
        <></>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
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
          fontSize: font,
          mb: 5,
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
