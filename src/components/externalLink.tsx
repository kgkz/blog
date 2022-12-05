import NextLink from 'next/link'
import MUILink from '@mui/material/Link'

type LinkProps = {
  readonly href?: string
  readonly children: React.ReactNode
}

export default function ExternalLink({ href, children }: LinkProps) {
  return (
    <MUILink component={NextLink} target="_blank" rel="noopener noreferrer" href={href}>
      {children}
    </MUILink>
  )
}
