import { createContext } from 'react'

export const BlogContext = createContext({})

// export const withBlogContext = Component =>
//   function inject(props) {
//     if (props.__next_ssg_error) {
//       return <h1>{props.__next_ssg_error} Error</h1>
//     }

//     return (
//       <BlogContext.Provider value={props.__next_ssg_data || {}}>
//         <Component {...props} />
//       </BlogContext.Provider>
//     )
//   }
