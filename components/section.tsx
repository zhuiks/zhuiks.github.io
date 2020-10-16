import React from 'react'
import styles from './section.module.scss'

interface SectionProps {
  title: string
  tag: string
  details: string
}

const Section: React.FC<SectionProps> = ({ title, tag, details }) => (
  <section className={styles.container}>
    <h2 className={styles.title}>{title}</h2>
    <summary className={styles.bg}>
      <h3>{tag}</h3>
      <p>{details}</p>
    </summary>
  </section>
)

export default Section