import { Query } from '../../types/apiRequest'
import { MetaData, Tag } from '../../types/apiResponse'

export type Methods = {
  get: {
    resBody: MetaData & {
      contents: Tag[]
    }
    query?: Query
  }
}
