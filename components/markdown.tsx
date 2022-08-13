import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

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
              <code
                className={className}
                style={{ background: '#9E9E9E', color: '#EF5350', padding: 3 }}
                {...props}
              >
                {children}
              </code>
            )
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </>
  )
}
