import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Main from '../components/Main'
import styles from '../src/styles/Home.module.css'

const sections = [
  {
    title: 'about',
    path: 'about',
  },
  {
    title: 'contact',
    path: 'contact',
  },
]

const Home: NextPage = props => {
  return (
    <>
      <Container maxWidth="lg">
        <Header title="kgkz" sections={sections} />
        <main>
          <Grid></Grid>
        </main>
      </Container>
      <Footer title="atodenanikakaku" description="syousaihakotira" />
    </>
  )
}

export default Home
