type BaseValue = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
  revisedAt: string
}

type Image = {
  url: string
  width: number
  height: number
}

export type Category = BaseValue & {
  name: string
}

export type Author = BaseValue & {
  name: string
  text: string
  image: Image
}

export type Tag = BaseValue & {
  name: string
}

export type Blog = BaseValue & {
  title: string
  category: Category
  toc_visible: boolean
  body: string
  description: string
  ogimage: Image
  writer: Author
  tag: Tag[]
  related_blogs: Blog[]
}

export type Banner = BaseValue & {
  image: Image
  url: string
  alt: string
}

export type MetaData = {
  totalCount: number
  offset: number
  limit: number
}

export type LinkContent = {
  title?: string
  url?: string
  image?: string
  description?: string
}
