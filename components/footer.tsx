import clsx from 'clsx'
import React from 'react'
import styles from '../styles/footer.module.scss'
export interface FooterData {
  header: string
  links?: {[icon: string]: string }
}

interface FooterProps extends FooterData{
  active?: boolean
}
const Footer: React.FC<FooterProps> = ({header, links, active}) => (
  <footer className={clsx(styles.footer, active && styles.active)}>
    <h3>{header}</h3>
    {links &&
    <div className={styles.icons}>
      {Object.entries(links).map(([icon, link]) => (
        <a href={link} className={styles[icon]} target="_blank" rel="noopener noreferrer"><span /></a>
      ))}
    </div>
    }
  </footer>  
)

export default Footer