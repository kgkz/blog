import Toolbar from '@mui/material/Toolbar'
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

  const myLoader = ({ src, width, quality }: { src: string; width?: number; quality?: number }) => {
    return `${process.env.IMAGE_URL}8cabe2d9091749739606486b6a961cd3/${src}?fm=webp`
  }

  return (
    <Box component="header" sx={{ position: 'relative', overflow: 'hidden', height: 500 }}>
      <Image loader={myLoader} src="top.JPG" alt="top image" layout="fill" objectFit="cover" />
      <Toolbar>
        <Link
          component={NextLink}
          variant="h3"
          href="/"
          color="#ffffff"
          underline="none"
          noWrap
          align="right"
          sx={{ flex: 1, fontWeight: 'bold' }}
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
            variant="h5"
            sx={{ px: 2, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </Box>
  )
}
