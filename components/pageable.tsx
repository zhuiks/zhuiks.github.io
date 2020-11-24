import React, { CSSProperties, ReactNode, ReactNodeArray, useEffect, useState, WheelEvent } from 'react'
import useScroll from '../lib/use-scroll'
import useWindowSize from '../lib/use-window-size'
import Footer, { FooterData } from './footer'
import Pips from './pips'
import { ActiveClass } from './section'

interface PageableProps {
  footerData?: FooterData
}

const Pageable: React.FC<PageableProps> = ({ children, footerData }) => {
  const { height } = useWindowSize()
  const s = useScroll({
    totalPages: React.Children.count(children),
    pageSize: 0
  })

  useEffect(() => {
    s.resize(height)
  }, [height])

  let ActiveChildren: ReactNode[] = []
  let links: { [id: string]: string } = {}
  React.Children.forEach(children, (element, i) => {
    if (!React.isValidElement(element)) return

    let activeClass: ActiveClass | undefined
    if (i === s.index - 1) {
      activeClass = s.absOffset < 0 ? 'prev-scroll' : 'prev'
    }
    if (i === s.index + 1) {
      activeClass = 'next'
    }
    if (i === s.index && s.absOffset >= 0) {
      activeClass = s.absOffset === 0 ? 'active' : 'scroll'
    }
    if (activeClass) {
      ActiveChildren.push(React.cloneElement(element, { ...element.props, active: activeClass }))
    } else {
      ActiveChildren.push(element)
    }

    const { name, tag } = element.props
    links[name] = tag
  })

  const pixelOffset = s.offset * height / 100

  const style: CSSProperties = {
    // @ts-ignore
    '--offset': `${s.offset}vh`,
    '--scroll': `${-(s.index * height + pixelOffset)}px`,
    '--abs-offset': s.absOffset
  }

  return (
    <>
      <main
        onWheel={(event: React.WheelEvent<HTMLElement>) => s.scrollByStep(event.deltaY)}
        onMouseDown={s.startDrag}
        onMouseMove={s.drag}
        onMouseUp={s.endDrag}
        onTouchStart={s.startDrag}
        onTouchMove={s.drag}
        onTouchEnd={s.endDrag}
        style={style}
      >
        {ActiveChildren}
      </main>
      <Pips links={links} active={s.index} onClick={s.scrollToIndex} />
      <style jsx>{`
        main {
          min-height: 100vh;
          width: 100%;
          margin-top: var(--scroll, 0);
          transition: margin-top 0.3s ease-out;
        }
    `}</style>
      { footerData &&
        <Footer active={s.activeEnd} {...footerData} />
      }
    </>
  )
}

export default Pageable