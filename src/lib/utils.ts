import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Blog } from '../types/apiResponse'

dayjs.extend(utc)
dayjs.extend(timezone)

export const formatDate = (date: string, format: string) => {
  return dayjs.utc(date).tz('Asia/Tokyo').format(format)
}

export const groupByDate = (contents: Blog[]) => {
  return contents.reduce((group, content) => {
    if (!content.publishedAt) return group

    const groupingMonth = formatDate(content.publishedAt, 'YYYY/MM')
    const _ = group.has(groupingMonth) ? group.get(groupingMonth) : undefined
    if (_ !== undefined) {
      _.push(content)
    } else {
      group.set(groupingMonth, [content])
    }

    return group
  }, new Map<string, Blog[]>())
}
