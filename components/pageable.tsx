import React, { CSSProperties, ReactNode, useState, WheelEvent } from 'react'
import useWindowSize from '../lib/use-window-size'
import Footer, { FooterData } from './footer'
import Pips from './pips'
import { ActiveClass } from './section'

const DELTA = 7
interface PageableProps {
  footerData?: FooterData
}
let justScrolled = false

const Pageable: React.FC<PageableProps> = ({ children, footerData }) => {
  const [index, setIndex] = useState(0)
  const [shift, setShift] = useState(0)
  const { height } = useWindowSize()

  let ActiveChildren: ReactNode[] = []
  let links: { [id: string]: string } = {}
  React.Children.forEach(children, (element, i) => {
    if (!React.isValidElement(element)) return

    let activeClass: ActiveClass | undefined
    if (i === index - 1) {
      activeClass = shift < 0 ? 'prev-scroll' : 'prev'
    }
    if (i === index + 1) {
      activeClass = 'next'
    }
    if (i === index && shift >= 0) {
      activeClass = shift === 0 ? 'active' : 'scroll'
    }
    if (activeClass) {
      ActiveChildren.push(React.cloneElement(element, { ...element.props, active: activeClass }))
    } else {
      ActiveChildren.push(element)
    }

    const { name, tag } = element.props
    links[name] = tag
  })

  const lastSection = Object.keys(links).length - 1
  if (Math.abs(shift) > 3 * DELTA && !(shift < 0 && index === 0) && !(index === lastSection && shift > 0)) {
    setIndex(shift < 0 ? index - 1 : index + 1)
    setShift(0)
    justScrolled = true
    setTimeout(() => {
      justScrolled = false
    }, 1000)
  }
  const offset = shift * height / 100
  const style: CSSProperties = {
    // @ts-ignore
    '--offset': `${shift}vh`,
    '--scroll': `${-(index * height + offset)}px`,
    '--abs-offset': shift / DELTA
  }
  console.log(`--- Render: offset=${offset}px`)

  const handleWheel = (event: WheelEvent<HTMLElement>) => {
    if (justScrolled) return
    if (index === 0 && event.deltaY < 0 && shift - DELTA < 0) return
    if (index === lastSection && event.deltaY > 0 && shift / DELTA > 2) return
    setShift(event.deltaY < 0 ? shift - DELTA : shift + DELTA)
  }
  return (
    <>
      <main onWheel={handleWheel} style={style}>{ActiveChildren}</main>
      <Pips links={links} active={index} onClick={(i) => setIndex(i)} />
      <style jsx>{`
        main {
          min-height: 100vh;
          width: 100%;
          margin-top: var(--scroll, 0);
          transition: margin-top 0.3s ease-out;
        }
    `}</style>
      { footerData &&
        <Footer active={index === lastSection && shift / DELTA > 1} {...footerData} />
      }
    </>
  )
}

export default Pageable