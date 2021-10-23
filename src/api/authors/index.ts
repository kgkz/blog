import { Headers, Query } from '../../types/apiRequest'
import { Author, MetaData } from '../../types/apiResponse'

export type Methods = {
  get: {
    resBody: MetaData & {
      contents: Author[]
    }
    query?: Query
    reqHeaders: Headers
  }
}
