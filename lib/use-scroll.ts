import { useState } from 'react'
import useWindowSize from './use-window-size'

const DELTA_STEP = 7
let justScrolled = false

const useScroll = (totalSections: number) => {
  const [index, setIndex] = useState(0)
  const [offset, setOffset] = useState(0)

  const isFirstSection = index === 0
  const isLastSection = index === totalSections - 1

  if (Math.abs(offset) > 3 * DELTA_STEP && !(isFirstSection && offset < 0) && !(isLastSection && offset > 0)) {
    setIndex(offset < 0 ? index - 1 : index + 1)
    setOffset(0)
    justScrolled = true
    setTimeout(() => {
      justScrolled = false
    }, 1000)
  }

  const scrollByValue = (relativeDelta: number) => {
    if (justScrolled) return
    if (isFirstSection && relativeDelta < 0 && offset - relativeDelta < 0) return
    if (isLastSection && relativeDelta > 0 && offset / DELTA_STEP > 2) return
    setOffset(offset + relativeDelta)
  }
  const scrollByStep = (eventDelta: number) => scrollByValue(eventDelta < 0 ? - DELTA_STEP : DELTA_STEP)

  const scrollToIndex = (i: number) => {
    setOffset(0)
    setIndex(i)
  }

  return {
    index,
    offset,
    absOffset: offset / DELTA_STEP,
    isFirstSection,
    isLastSection,
    byValue: scrollByValue,
    byStep: scrollByStep,
    toIndex: scrollToIndex
  }
}

export default useScroll