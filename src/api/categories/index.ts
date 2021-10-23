import { Headers, Query } from '../../types/apiRequest'
import { Category, MetaData } from '../../types/apiResponse'

export type Methods = {
  get: {
    resBody: MetaData & {
      contents: Category[]
    }
    query?: Query
    reqHeaders: Headers
  }
}
