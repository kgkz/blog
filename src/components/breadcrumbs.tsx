import NextLink from 'next/link'
import { useRouter } from 'next/router'

import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import HomeIcon from '@mui/icons-material/Home'
import CategoryIcon from '@mui/icons-material/CategoryOutlined'
import LocalOfferIcon from '@mui/icons-material/LocalOfferOutlined'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonthOutlined'

import { Blog } from '../types/apiResponse'
import { formatDate } from '../lib/utils'

type BreadcrumbsProps = {
  blogs: Blog[]
  blog?: Blog
  currentTag?: string
}

export default function Breadcrumbs({ blogs, blog, currentTag }: BreadcrumbsProps) {
  const pathName = useRouter().pathname

  const renderBreadcrumbs = () => {
    if (pathName === '/' || !blogs.length) return
    let breadcrumbs = [
      <NextLink href="/" key="home" passHref>
        <Link sx={{ display: 'flex', alignItems: 'center' }}>
          <HomeIcon sx={{ mr: 0.2, mb: 0.1 }} />
          Home
        </Link>
      </NextLink>,
    ]
    switch (pathName) {
      case pathName.startsWith('/categories') && pathName:
        breadcrumbs.push(
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            <CategoryIcon sx={{ mr: 0.2, mb: 0.1 }} />
            {blogs[0].category.name}
          </Typography>
        )
        break
      case pathName.startsWith('/tags') && pathName:
        breadcrumbs.push(
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalOfferIcon sx={{ mr: 0.2, mb: 0.1 }} />
            {currentTag}
          </Typography>
        )
        break
      case pathName.startsWith('/archive') && pathName:
        breadcrumbs.push(
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarMonthIcon sx={{ mr: 0.2, mb: 0.1 }} />
            {formatDate(blogs[0].publishedAt ?? '', 'YYYY-MM')}
          </Typography>
        )
        break
      case pathName.startsWith('/posts') && pathName:
        breadcrumbs.push(
          <NextLink href={`/categories/${blog?.category.id}`} passHref key={blog?.category.name}>
            <Link sx={{ display: 'flex', alignItems: 'center' }}>
              <CategoryIcon sx={{ mr: 0.2, mb: 0.1 }} />
              {blog?.category.name}
            </Link>
          </NextLink>,
          <Typography>{blog?.title}</Typography>
        )
        break
    }
    return breadcrumbs
  }

  return (
    <MuiBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ mt: 2 }}
    >
      {renderBreadcrumbs()}
    </MuiBreadcrumbs>
  )
}
