import React, { CSSProperties, ReactNode, ReactNodeArray, useState, WheelEvent } from 'react'
import useScroll from '../lib/use-scroll'
import useWindowSize from '../lib/use-window-size'
import Footer, { FooterData } from './footer'
import Pips from './pips'
import { ActiveClass } from './section'

const DRAG_THRESHOLD = 50 //px

interface PageableProps {
  footerData?: FooterData
}

const Pageable: React.FC<PageableProps> = ({ children, footerData }) => {
  const { height } = useWindowSize()
  const [dragY, setDragY] = useState<number>()
  const scroll = useScroll(React.Children.count(children))

  let ActiveChildren: ReactNode[] = []
  let links: { [id: string]: string } = {}
  React.Children.forEach(children, (element, i) => {
    if (!React.isValidElement(element)) return

    let activeClass: ActiveClass | undefined
    if (i === scroll.index - 1) {
      activeClass = scroll.absOffset < 0 ? 'prev-scroll' : 'prev'
    }
    if (i === scroll.index + 1) {
      activeClass = 'next'
    }
    if (i === scroll.index && scroll.absOffset >= 0) {
      activeClass = scroll.absOffset === 0 ? 'active' : 'scroll'
    }
    if (activeClass) {
      ActiveChildren.push(React.cloneElement(element, { ...element.props, active: activeClass }))
    } else {
      ActiveChildren.push(element)
    }

    const { name, tag } = element.props
    links[name] = tag
  })

  const pixelOffset = scroll.offset * height / 100

  type MouseEvent = React.MouseEvent<HTMLElement> 
  type TouchEvent = React.TouchEvent<HTMLElement>

  type DragEvent = MouseEvent | TouchEvent

  
  function isTouch(e: DragEvent): e is TouchEvent {
    return (e as React.TouchEvent<HTMLElement>).touches !== undefined
  }
  
  const getClientY = (event: DragEvent) => (
    isTouch(event) ? event.touches[0].clientY : event.clientY
  )

  const startDrag = (event: DragEvent) => {
    if(dragY !== undefined) return
    if(!isTouch(event) && event.button !== 0) return
    setDragY(getClientY(event))
  }

  const handleDrag = (event: DragEvent) => {
    if (!dragY) return
    const deltaY = dragY - getClientY(event)
    setDragY(getClientY(event))
    scroll.byValue(100 * deltaY / height)
  }
  const endDrag = (event: DragEvent) => {
    setDragY(undefined)
    const updatedIndex = Math.abs(pixelOffset) > DRAG_THRESHOLD ? scroll.index + Math.sign(pixelOffset) : scroll.index
    scroll.toIndex(updatedIndex)
  }

  const style: CSSProperties = {
    // @ts-ignore
    '--offset': `${scroll.offset}vh`,
    '--scroll': `${-(scroll.index * height + pixelOffset) }px`,
    '--abs-offset': scroll.absOffset
  }

  return (
    <>
      <main
        onWheel={(event: React.WheelEvent<HTMLElement>) => scroll.byStep(event.deltaY)}
        onMouseDown={startDrag}
        onMouseMove={handleDrag}
        onMouseUp={endDrag}
        onTouchStart={startDrag}
        onTouchMove={handleDrag}
        onDragEnd={endDrag}
        style={style}
      >
        {ActiveChildren}
      </main>
      <Pips links={links} active={scroll.index} onClick={scroll.toIndex} />
      <style jsx>{`
        main {
          min-height: 100vh;
          width: 100%;
          margin-top: var(--scroll, 0);
          transition: margin-top 0.3s ease-out;
        }
    `}</style>
      { footerData &&
        <Footer active={scroll.isLastSection && scroll.absOffset > 1} {...footerData} />
      }
    </>
  )
}

export default Pageable