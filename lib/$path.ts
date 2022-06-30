/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  header: {
    about: {
      $url: (url?: { hash?: string }) => ({ pathname: '/header/about' as const, hash: url?.hash })
    },
    contact: {
      $url: (url?: { hash?: string }) => ({ pathname: '/header/contact' as const, hash: url?.hash })
    }
  },
  posts: {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/posts/[id]' as const, query: { id }, hash: url?.hash })
    })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath
