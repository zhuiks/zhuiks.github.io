import React from 'react'
import styles from './section.module.scss'

interface SectionProps {
  name: string
  title?: string
  tag: string
  details?: string
  quote?: string
  colors?: {
    title?: string
    tag?: string
    details?: string
  }
}

const Section: React.FC<SectionProps> = ({ name, title, tag, details, quote, colors}) => (
  <section className={styles.container}>
    {title && <h2 className={styles.title} style={colors && colors.title ? {color: colors.title}: {}}>{title}</h2>}
    <summary className={styles.bg} style={{ backgroundImage: `url(/images/${name}.jpg)` }}>
      <h3 style={colors && colors.tag ? {color: colors.tag}: {}}>{tag}</h3>
      {details && <p style={colors && colors.details ? {color: colors.details}: {}}>{details}</p>}
      {quote && <p className={styles.quote}>{quote}</p>}
    </summary>
  </section>
)

export default Section