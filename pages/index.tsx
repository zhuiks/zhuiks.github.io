import React from 'react';
import Head from 'next/head'
import Section from '../components/section';
import { getData, Pages } from '../lib/data';
import { GetStaticProps } from 'next';
import Pageable from '../components/pageable'
import Footer, { FooterData } from '../components/footer';

export const getStaticProps: GetStaticProps = async () => {
  const pageData = getData()
  const footerData = getData('footer')
  return {
    props: {
      pageData,
      footerData,
    }
  }
}

const SPA: React.FC<{ pageData: Pages, footerData?: FooterData }> = ({ pageData, footerData }) => {
  const title = "Evgen Kucherov"
  const tagLine = "IT Consulting / Web Development"
  return (
    <>
      <Head>
        <title>{title} - {tagLine}</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@700&family=Poiret+One&family=Roboto&display=swap" rel="stylesheet" />
      </Head>

      <Pageable footerData={footerData}>
        {Object.entries(pageData).map(([id, section], i) => (
          <Section key={i} name={id} {...section} />
        ))}
      </Pageable>
    </>
  )
}

export default SPA