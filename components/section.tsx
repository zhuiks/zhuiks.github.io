import React from 'react'
import styles from './section.module.scss'
import clsx from 'clsx'

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
  active?: 'prev' | 'next'
}

const Section: React.FC<SectionProps> = ({ name, title, tag, details, quote, colors, active}) => (
  <section className={styles.container} id={name}>
    <div className={styles.bg} style={{ backgroundImage: `url(/images/${name}.jpg)` }} />
    {title && <h1 className={styles.title} style={colors && colors.title ? {color: colors.title}: {}}>{title}</h1>}
    <div className={clsx(styles.summary, active && styles[active])} >
      <h2 style={colors && colors.tag ? {color: colors.tag}: {}}>{tag}</h2>
      {details && <p style={colors && colors.details ? {color: colors.details}: {}}>{details}</p>}
      {quote && <blockquote className={styles.quote}>{quote}</blockquote>}
    </div>
  </section>
)

export default Section