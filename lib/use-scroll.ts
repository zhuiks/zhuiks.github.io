import { useState } from 'react'
import useWindowSize from './use-window-size'

const DELTA = 7
let justScrolled = false

const useScroll = (totalSections: number) => {
  const [index, setIndex] = useState(0)
  const [shift, setShift] = useState(0)

  const isFirstSection = index === 0
  const isLastSection = index === totalSections - 1

  if (Math.abs(shift) > 3 * DELTA && !(isFirstSection && shift < 0) && !(isLastSection && shift > 0)) {
    setIndex(shift < 0 ? index - 1 : index + 1)
    setShift(0)
    justScrolled = true
    setTimeout(() => {
      justScrolled = false
    }, 1000)
  }

  const byStep = (eventDelta: number) => {
    if (justScrolled) return
    if (isFirstSection && eventDelta < 0 && shift - DELTA < 0) return
    if (isLastSection && eventDelta > 0 && shift / DELTA > 2) return
    setShift(eventDelta < 0 ? shift - DELTA : shift + DELTA)
  }

  return {
    index,
    offset: shift,
    absOffset: shift / DELTA,
    isFirstSection,
    isLastSection,
    byStep,
    toIndex: (i: number) => setIndex(i)
  }
}

export default useScroll