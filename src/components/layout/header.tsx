import * as React from 'react'
import Toolbar from '@mui/material/Toolbar'
import { IconButton, Typography } from '@mui/material'
import { Search } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import NextLink from 'next/link'

type HeaderProps = {
  title: string
  sections: ReadonlyArray<{
    title: string
    path: string
  }>
}

export default function Header(props: HeaderProps) {
  const { sections, title } = props

  return (
    <Box component="header">
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
          <Search />
        </IconButton>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'left', overflowX: 'auto', borderBottom: 1, borderColor: 'divider' }}
      >
        {sections.map(section => (
          <NextLink href={`/${section.path}`} key={section.title} passHref>
            <Link color="inherit" noWrap variant="body1" sx={{ px: 5, flexShrink: 0 }}>
              {section.title}
            </Link>
          </NextLink>
        ))}
      </Toolbar>
    </Box>
  )
}
