import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { Box } from '@mui/system'

import imageLoader from '../lib/imageLoader'

type MarkdownProps = {
  readonly markdown: string
}

export default function Markdown(props: MarkdownProps) {
  const { markdown } = props
  //FIXME:型問題の修正
  const syntaxTheme: any = atomDark
  return (
    <>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter style={syntaxTheme} language={match[1]} PreTag="div" {...props}>
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <Box
                component="code"
                className={className}
                style={{ background: '#9E9E9E', color: '#EF5350', padding: 3 }}
                {...props}
              >
                {children}
              </Box>
            )
          },
          h1({ children, ...props }) {
            return (
              <Box component="h1" id={`${children}`}>
                {children}
              </Box>
            )
          },
          p({ node, children, ...props }) {
            const hasImg = node.children.some(child => {
              return child.type === 'element' && child.tagName === 'img'
            })
            if (hasImg) {
              return (
                <Box
                  component="div"
                  sx={{ position: 'relative', overflow: 'hidden', height: '20rem' }}
                >
                  {children}
                </Box>
              )
            }
            return <Box component="p">{children}</Box>
          },
          img({ node, className, children, alt, src, ...props }) {
            return (
              <Image
                loader={imageLoader}
                src={`${src?.split('/')[5]}/${src?.split('/')[6]}` || ''}
                fill
                alt={alt || ''}
                quality={75}
                priority
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
              />
            )
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </>
  )
}
