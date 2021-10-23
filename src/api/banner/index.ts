import { Headers, Query } from '../../types/apiRequest'
import { Banner } from '../../types/apiResponse'

export type Methods = {
  get: {
    resBody: Banner
    query?: Query
    reqHeaders: Headers
  }
}
