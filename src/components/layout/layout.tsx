import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Head from 'next/head'
import { ReactElement } from 'react'

import { Author, Blog, Category, Tag } from '../../types/apiResponse'
import Breadcrumbs from '../breadcrumbs'
import Sidebar from '../sidebar'
import Footer from './footer'
import Header from './header'

type LayoutProps = {
  readonly children: ReactElement
  blog?: Blog
  blogs: Blog[]
  categories?: Category[]
  tags?: Tag[]
  author?: Author
  contents?: string
  currentTag?: string
}

const sections = [
  {
    title: 'about',
    path: 'about',
  },
  {
    title: 'contact',
    path: 'contact',
  },
]

const baseDescription =
  'エンジニアの暗号を紐解くサイト『で・くりぷと』。Web開発,暗号資産,仮想通貨,Crypto Currency,Blockchain,NFT,脱SIer術,AIに関する情報をわかりやすく丁寧に解説することを目標にしています。'

export default function Layout({
  children,
  blog,
  blogs,
  categories,
  tags,
  author,
  contents,
  currentTag,
}: LayoutProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta
          name="description"
          content={blog?.description ? `${blog.description}-${baseDescription}` : baseDescription}
        />
        <title>{blog?.title ? `${blog?.title} で・くりぷと` : 'で・くりぷと'}</title>
      </Head>
      <Container maxWidth="lg">
        <Header title="で・くりぷと" sections={sections} />
        <Breadcrumbs blog={blog} blogs={blogs} currentTag={currentTag} />
        <Box sx={{ my: 5 }}>
          <Grid component="main" container spacing={6}>
            <Grid item xs={12} md={9}>
              {children}
            </Grid>
            <Grid item xs={12} md={3}>
              <Sidebar
                blogs={blogs}
                categories={categories}
                tags={tags}
                author={author}
                contents={contents}
              />
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </Container>
    </>
  )
}
