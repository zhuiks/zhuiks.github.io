import React from 'react'
import styles from '../styles/footer.module.scss'
export interface FooterProps {
  header: string
  links?: {[icon: string]: string }
}

const Footer: React.FC<FooterProps> = ({header, links}) => (
  <footer className={styles.footer}>
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