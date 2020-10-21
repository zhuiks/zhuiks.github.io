import React from 'react';
import Head from 'next/head'
import styles from '../styles/spa.module.scss'
import Section from '../components/section';
import { Data, getData } from '../lib/data';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const data = getData()
  return {
    props: {
      data
    }
  }
}

const SPA: React.FC<{ data: Data }> = ({ data }) => {
  const title = "Evgen Kucherov"
  const tagLine = "IT Consulting / Web Development"
  return (
    <>
      <Head>
        <title>{title} - {tagLine}</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@700&family=Poiret+One&family=Roboto&display=swap" rel="stylesheet" />
      </Head>

      <main className={styles.main}>
        {data.map(([key, section], i) => (
          <Section key={i} name={key} title={section.title} tag={section.tag} details={section.details} colors={section.colors}/>
        ))}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
        </a>
      </footer>
    </>
  )
}

export default SPA