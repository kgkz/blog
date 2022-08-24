export const pagesPath = {
  "about": {
    $url: (url?: { hash?: string }) => ({ pathname: '/about' as const, hash: url?.hash })
  },
  "archive": {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/archive/[id]' as const, query: { id }, hash: url?.hash })
    })
  },
  "categories": {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/categories/[id]' as const, query: { id }, hash: url?.hash })
    })
  },
  "contact": {
    $url: (url?: { hash?: string }) => ({ pathname: '/contact' as const, hash: url?.hash })
  },
  "posts": {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/posts/[id]' as const, query: { id }, hash: url?.hash })
    })
  },
  "privacy": {
    $url: (url?: { hash?: string }) => ({ pathname: '/privacy' as const, hash: url?.hash })
  },
  "tags": {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/tags/[id]' as const, query: { id }, hash: url?.hash })
    })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
