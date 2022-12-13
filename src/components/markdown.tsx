import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import ts from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import defaultAtomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import imageLoader from '../lib/imageLoader'
import ExternalLink from './externalLink'

type MarkdownProps = {
  readonly markdown: string
}

SyntaxHighlighter.registerLanguage('js', js)
SyntaxHighlighter.registerLanguage('ts', ts)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('bash', bash)

export default function Markdown({ markdown }: MarkdownProps) {
  return (
    <>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                style={defaultAtomDark as any}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <Box
                component="code"
                className={className}
                style={{ background: '#f0f3f3', color: '#333', padding: 5, lineHeight: 1.5 }}
                {...props}
              >
                {children}
              </Box>
            )
          },
          blockquote({ children }) {
            return (
              <Typography component="blockquote" variant="body1" sx={{ borderLeft: 3, pl: 2 }}>
                {children}
              </Typography>
            )
          },
          h1({ children, ...props }) {
            return (
              <Typography component="h1" variant="h1" id={`${children}`}>
                {children}
              </Typography>
            )
          },
          h2({ children, ...props }) {
            return (
              <Typography
                component="h2"
                variant="h2"
                id={`${children}`}
                sx={{ borderBottom: 2, borderBottomColor: '#5c93bb2b' }}
              >
                {children}
              </Typography>
            )
          },
          h3({ children, ...props }) {
            return (
              <Typography
                component="h3"
                variant="h3"
                id={`${children}`}
                sx={{ borderBottom: 1, borderBottomColor: '#5c93bb2b', display: 'inline-block' }}
              >
                {children}
              </Typography>
            )
          },
          h4({ children, ...props }) {
            return (
              <Typography component="h4" variant="h4" id={`${children}`}>
                {children}
              </Typography>
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
            return (
              <Typography component="p" variant="body1">
                {children}
              </Typography>
            )
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
          a({ node, children, href, title, ...props }) {
            return <ExternalLink href={href}>{children}</ExternalLink>
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </>
  )
}
