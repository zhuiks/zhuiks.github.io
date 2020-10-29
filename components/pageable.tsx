import React, { CSSProperties, ReactElement, ReactNode, useLayoutEffect, useRef, useState, WheelEvent } from 'react'
import useWindowSize from '../lib/use-window-size'
import Pips from './pips'

const DELTA = 7
interface PageableProps {

}
let justScrolled = false

const Pageable: React.FC<PageableProps> = ({ children }) => {
  const [index, setIndex] = useState(0)
  const [shift, setShift] = useState(0)
  const mainRef = useRef<HTMLElement>(null)
  const { height } = useWindowSize()
  // React.useEffect(() => {
  //   new Pageable('main', {freeScroll: true})
  // }, [])
  let ActiveChildren: ReactNode[] = []
  let links: { [id: string]: string } = {}
  React.Children.forEach(children, (element, i) => {
    if (!React.isValidElement(element)) return
    switch (i) {
      case index - 1:
        ActiveChildren.push(React.cloneElement(element, { ...element.props, active: 'prev' }))
        break
      case index + 1:
        ActiveChildren.push(React.cloneElement(element, { ...element.props, active: 'next' }))
        break
      default:
        ActiveChildren.push(element)
    }
    const { name, tag } = element.props
    links[name] = tag
  })
  if (Math.abs(shift) > 3 * DELTA && !(shift < 0 && index === 0) && !(index === Object.keys(links).length - 1 && shift > 0)) {
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
    '--offset': `${offset}px`,
    '--scroll': `${-(index * height + offset)}px`,
  }
  console.log(`--- Render: offset=${offset}px`)

  const handleWheel = (event: WheelEvent<HTMLElement>) => {
    if (justScrolled || event.deltaY < 0 && index === 0 && shift - DELTA < 0) return
    setShift(event.deltaY < 0 ? shift - DELTA : shift + DELTA)
  }
  return (
    <>
      <main ref={mainRef} onWheel={handleWheel} style={style}>{ActiveChildren}</main>
      <Pips links={links} active={index} onClick={(i) => setIndex(i)} />
      <style jsx>{`
        main {
          min-height: 100vh;
          width: 100%;
          margin-top: var(--scroll, 0);
          transition: margin-top 0.3s ease-out;
        }
    `}</style>
    </>
  )
}

export default Pageable