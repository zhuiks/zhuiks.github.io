import React from 'react'
import styles from './pips.module.scss'

interface PipsProps {
  links: string[] | {[id: string]: string}
  active?: string | number
  onClick?: () => void
}
const PipItem: React.FC<{id: string, title?: string, active?: boolean}> = ({id, title, active}) => (
  <li key={id}>
  <a 
    className={active ? styles.active : styles.pip } 
    href={`#${id}`}
    title={title}
  >
    <span />
  </a>
</li>

)
const Pips: React.FC<PipsProps> = ({ links,  active}) => (
  <nav className={styles.pips}>
    <ul>
      {Array.isArray(links) ? links.map((r, i) => (
        <PipItem key={i} id={r} active={typeof active === "number" && active === i || active === r} />
      )) : Object.entries(links).map(([id, title], i) => (
        <PipItem key={i} id={id} title={title} active={typeof active === "number" && active === i || active === id} />
      ))}
    </ul>
  </nav>
)

export default Pips