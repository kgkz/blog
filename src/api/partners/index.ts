import { Headers, Query } from '../../types/apiRequest'
import { MetaData, Partner } from '../../types/apiResponse'

export type Methods = {
  get: {
    resBody: MetaData & {
      contents: Partner[]
    }
    query?: Query
    reqHeaders: Headers
  }
}
