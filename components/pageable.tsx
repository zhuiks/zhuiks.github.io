import React, { useLayoutEffect, useRef, useState, WheelEvent } from 'react'
import useWindowSize from '../lib/use-window-size'
import Pips from './pips'

const DELTA = 10
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
  let links: { [id: string]: string } = {}
  React.Children.forEach(children, element => {
    if (!React.isValidElement(element)) return
    const { name, tag } = element.props
    links[name] = tag
  })
  if(Math.abs(shift) > 30 && !(shift < 0 && index === 0 ) && !(index === Object.keys(links).length-1 && shift > 0)) {
    setIndex(shift < 0 ? index -1 : index + 1)
    setShift(0)
    justScrolled = true
    setTimeout(() => {
      justScrolled = false
    }, 1000)
  }
  const pixelShift = index * height + shift * height / 100
  console.log(`--- Render: pixelShift=${pixelShift}`)

  const handleWheel = (event: WheelEvent<HTMLElement>) => {
    if(justScrolled || event.deltaY < 0 && index === 0 && shift - DELTA < 0) return
    setShift(event.deltaY < 0 ? shift - DELTA : shift + DELTA)
  }
  return (
    <>
      <main ref={mainRef} onWheel={handleWheel} style={{marginTop: -pixelShift}}>{children}</main>
      <Pips links={links} active={index} />
      <style jsx>{`
        main {
          min-height: 100vh;
          width: 100%;
          transition: margin-top 0.3s ease-out
        }
      `}</style>
    </>
  )
}

export default Pageable