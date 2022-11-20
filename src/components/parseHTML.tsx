import Typography from '@mui/material/Typography'
import * as cheerio from 'cheerio'
import hljs from 'highlight.js'

type ParseHTMLProps = {
  html: string
}

export default function ParseHTML({ html }: ParseHTMLProps) {
  const $ = cheerio.load(html)
  $('pre code').each((_, element) => {
    const result = hljs.highlightAuto($(element).text())
    $(element).html(result.value)
    $(element).addClass('hljs')
  })

  $('h1').each((_, element) => {
    $(element).attr('id', $(element).text())
  })

  return (
    <Typography
      variant="body2"
      component="div"
      dangerouslySetInnerHTML={{ __html: $.html() }}
      sx={{
        fontSize: '1.1rem',
        '& blockquote': {
          px: 2,
          borderLeft: 2,
          borderColor: 'grey.500',
        },
      }}
    />
  )
}
