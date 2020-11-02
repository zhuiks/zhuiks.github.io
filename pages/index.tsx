import React from 'react';
import Head from 'next/head'
import styles from '../styles/spa.module.scss'
import Section from '../components/section';
import { Data, getData } from '../lib/data';
import { GetStaticProps } from 'next';
import Pageable from '../components/pageable'
import Footer from '../components/footer';

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

      <Pageable>
        {Object.entries(data).map(([id, section], i) => (
          <Section key={i} name={id} title={section.title} tag={section.tag} details={section.details} quote={section.quote} colors={section.colors} />
        ))}
      </Pageable>
      <Footer />
    </>
  )
}

export default SPA