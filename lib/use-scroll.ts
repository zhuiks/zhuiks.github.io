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

  const byStep = (eventDelta: number) => {
    if (justScrolled) return
    if (isFirstSection && eventDelta < 0 && offset - DELTA_STEP < 0) return
    if (isLastSection && eventDelta > 0 && offset / DELTA_STEP > 2) return
    setOffset(eventDelta < 0 ? offset - DELTA_STEP : offset + DELTA_STEP)
  }

  return {
    index,
    offset,
    absOffset: offset / DELTA_STEP,
    isFirstSection,
    isLastSection,
    byStep,
    toIndex: (i: number) => setIndex(i)
  }
}

export default useScroll