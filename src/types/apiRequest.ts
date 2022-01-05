export type Query = {
  draftKey?: string
  limit?: number
  offset?: number
  orders?: string
  q?: string
  fields?: string
  ids?: string[] | string | undefined
  filters?: string
  depth?: 1 | 2 | 3
}

export type SingularQuery = {
  draftKey?: string
  fields?: string
  depth?: 1 | 2 | 3
}
