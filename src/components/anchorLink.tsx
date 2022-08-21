import { ReactNode, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { UrlObject } from 'url'
import NextLink from 'next/link'

type Props = {
  to: UrlObject | string
  anchor: string
  children: ReactNode
}

export const AnchorLink = ({ children, to, anchor }: Props) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const router = useRouter()

  useEffect(() => {
    const hashChanged = (url: string) => {
      const hash = url.split('#')[1]
      if (hash !== anchor) return
      ref.current?.scrollIntoView()
    }
    router.events.on('hashChangeStart', hashChanged)
    return () => router.events.off('hashChangeStart', hashChanged)
  }, [anchor])
  return (
    <NextLink href={to}>
      <a ref={ref}>{children}</a>
    </NextLink>
  )
}

export default AnchorLink
