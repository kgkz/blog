import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../src/styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Link href="posts">
      <a>Post</a>
    </Link>
  )
}

export default Home
