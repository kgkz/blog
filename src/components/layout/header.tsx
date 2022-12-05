import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

import NextLink from 'next/link'
import Image from 'next/image'

import imageLoader from '../../lib/imageLoader'

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
      <Image
        loader={imageLoader}
        src="8cabe2d9091749739606486b6a961cd3/top.JPG"
        alt="top image"
        fill
        quality={30}
        priority
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
      />
      <Toolbar>
        <Link
          component={NextLink}
          href="/"
          color="#ffffff"
          underline="none"
          noWrap
          align="right"
          sx={{ flex: 1, fontWeight: 'bold', fontSize: '2rem' }}
        >
          {title}
        </Link>
      </Toolbar>
      <Toolbar component="nav" variant="dense" sx={{ justifyContent: 'right', overflowX: 'auto' }}>
        {sections.map(section => (
          <Link
            href={`/${section.path}`}
            component={NextLink}
            key={section.title}
            color="#ffffff"
            noWrap
            sx={{ px: 2, flexShrink: 0, fontSize: '1.4rem' }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </Box>
  )
}
