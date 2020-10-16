import React from 'react';
import Head from 'next/head'
import styles from '../styles/spa.module.scss'
import Section from '../components/section';

const SPA: React.FC = () => {
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
          <Section title="Evgen Kucherov" tag="Cool dude" details="a bounch of staff" />
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