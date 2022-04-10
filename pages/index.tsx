import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { apiClient } from '../src/lib/api-client'
import styles from '../src/styles/Home.module.css'
import { Blog } from '../src/types/apiResponse'

type Props = {
  contents: Blog[]
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await apiClient.blog.$get()
  return {
    props: { ...data },
  }
}

const Home: NextPage<Props> = props => {
  const { contents } = props
  return (
    <div className={styles.container}>
      {contents.map(content => (
        <div key={content.id} className={styles.content}>
          <Link href={`/posts/${content.id}`}>
            <a>{content.title}</a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Home
