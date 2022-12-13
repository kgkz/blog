import { useEffect } from 'react'
import TocIcon from '@mui/icons-material/Toc'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import tocbot from 'tocbot'

export default function Toc() {
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.postsContent',
      headingSelector: 'h2, h3',
      collapseDepth: 0,
      hasInnerContainers: false,
      linkClass: 'MuiLink-root',
      extraLinkClasses: 'MuiLink-underlineAlways',
      disableTocScrollSync: true,
    })
    return () => tocbot.destroy()
  }, [])

  return (
    <Paper variant="outlined" elevation={24} sx={{ p: 2, my: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'left', mt: 1 }}>
        <TocIcon sx={{ fontSize: '2.5rem' }} />
        <Typography sx={{ ml: 1, fontSize: '1.5rem' }}>目次</Typography>
      </Box>
      <Typography component="nav" className="toc" sx={{ color: '#000000DE' }} />
    </Paper>
  )
}
