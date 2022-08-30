import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Blog } from '../types/apiResponse'
import { apiClient } from './api-client'

dayjs.extend(utc)
dayjs.extend(timezone)

export const formatDate = (date: string, format: string) => {
  return dayjs.utc(date).tz('Asia/Tokyo').format(format)
}

export const groupByDate = (contents: Blog[]) => {
  return contents.reduce((group, content) => {
    if (!content.publishedAt) return group

    const groupingMonth = formatDate(content.publishedAt, 'YYYY-MM')
    const _ = group.has(groupingMonth) ? group.get(groupingMonth) : undefined
    if (_ !== undefined) {
      _.push(content)
    } else {
      group.set(groupingMonth, [content])
    }

    return group
  }, new Map<string, Blog[]>())
}

export const getDataForLayout = async (id?: string[] | string) => {
  const blog = id ? await apiClient.blogs.$get({ query: { ids: id } }) : null
  const blogs = await apiClient.blogs.$get({
    query: {
      fields: 'id,title,updatedAt,description,ogimage,publishedAt,tag,category',
      limit: 3000,
    },
  })
  const categories = await apiClient.categories.$get()
  const tags = await apiClient.tags.$get()
  const author = await apiClient.authors.$get()

  return {
    blog,
    blogs,
    categories,
    tags,
    author,
  }
}
