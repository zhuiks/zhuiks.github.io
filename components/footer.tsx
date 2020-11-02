import React from 'react'
import styles from './footer.module.scss'
interface FooterProps {

}

const Footer: React.FC<FooterProps> = () => (
  <footer className={styles.footer}>
    <h3>Want to talk about a project?</h3>
    <div className={styles.icons}>
      <a href="#" className={styles.linkedin}><span /></a>
      <a href="#" className={styles.github}><span /></a>
      <a href="#" className={styles.facebook}><span /></a>
      <a href="#" className={styles.email}><span /></a>
    </div>
  </footer>  
)

export default Footer