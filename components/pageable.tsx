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
  const [mouseY, setMouseY] = useState<number>()
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

  const handleDrag = (event: React.MouseEvent<HTMLElement>) => {
    if (!mouseY) return
    const deltaY = mouseY - event.clientY
    setMouseY(event.clientY)
    scroll.byValue(100 * deltaY / height)
  }
  const endDrag = (event: React.MouseEvent<HTMLElement>) => {
    setMouseY(undefined)
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
        onMouseDown={(event: React.MouseEvent<HTMLElement>) =>
          (mouseY === undefined || event.button !== 0 ? setMouseY(event.clientY) : false)
        }
        onMouseMove={handleDrag}
        onMouseUp={endDrag}
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