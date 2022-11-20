import * as React from 'react'
import Toolbar from '@mui/material/Toolbar'
import { IconButton, Typography } from '@mui/material'
import { Search } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

import NextLink from 'next/link'
import Image from 'next/image'

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
    <Box component="header" sx={{ position: 'relative', overflow: 'hidden', height: 500 }}>
      <Image src="/top.jpg" alt="top" layout="fill" objectFit="cover" />
      <Toolbar>
        <NextLink href="/" passHref>
          <Link
            variant="h3"
            color="#ffffff"
            underline="none"
            noWrap
            align="right"
            sx={{ flex: 1, fontWeight: 'bold' }}
          >
            {title}
          </Link>
        </NextLink>
      </Toolbar>
      <Toolbar component="nav" variant="dense" sx={{ justifyContent: 'right', overflowX: 'auto' }}>
        {sections.map(section => (
          <NextLink href={`/${section.path}`} key={section.title} passHref>
            <Link color="#ffffff" noWrap variant="h5" sx={{ px: 2, flexShrink: 0 }}>
              {section.title}
            </Link>
          </NextLink>
        ))}
      </Toolbar>
    </Box>
  )
}
