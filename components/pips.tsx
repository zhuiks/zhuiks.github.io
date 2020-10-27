import React from 'react'
import styles from './pips.module.scss'

interface PipsProps {
  links: string[]
  active?: string | number
  onClick?: () => void
}
const Pips: React.FC<PipsProps> = ({ links,  active}) => (
  <nav className={styles.pips}>
    <ul>
      {links.map((r, i) => (
        <li key={r}>
          <a 
            className={typeof active === "number" && active === i || active === r ? styles.active : styles.pip } 
            href={`#${r}`}
          >
            <span />
          </a>
        </li>
      ))}
    </ul>
  </nav>
)

export default Pips