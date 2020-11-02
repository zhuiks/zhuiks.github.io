import React from 'react'
import styles from '../styles/pips.module.scss'

interface PipItemProps {
  id: string
  title?: string
  active?: boolean
  onClick: () => void
}

const PipItem: React.FC<PipItemProps> = ({ id, title, active, onClick }) => (
  <li key={id}>
    <a
      className={active ? styles.active : styles.pip}
      href={`#${id}`}
      title={title}
      onClick={(event) => {
        event.preventDefault
        onClick()
      }}
    >
      <span />
    </a>
  </li>
)
interface PipsProps {
  links: string[] | { [id: string]: string }
  active?: string | number
  onClick?: (index: number) => void
}

const Pips: React.FC<PipsProps> = ({ links, active, onClick }) => (
  <nav className={styles.pips}>
    <ul>
      {Array.isArray(links) ? links.map((r, i) => (
        <PipItem
          key={i}
          id={r}
          active={typeof active === "number" && active === i || active === r}
          onClick={() => onClick && onClick(i)}
        />
      )) : Object.entries(links).map(([id, title], i) => (
        <PipItem
          key={i}
          id={id}
          title={title}
          active={typeof active === "number" && active === i || active === id}
          onClick={() => onClick && onClick(i)}
        />
      ))}
    </ul>
  </nav>
)

export default Pips