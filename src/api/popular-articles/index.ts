import { Query } from '../../types/apiRequest'
import { Blog, MetaData } from '../../types/apiResponse'

export type Methods = {
  get: {
    resBody: MetaData & {
      articles: Blog[]
    }
    query?: Query
  }
}
