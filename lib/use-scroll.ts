import { useState, useReducer, useDebugValue, useEffect } from 'react'
import useWindowSize from './use-window-size'

const DELTA_STEP = 7
const TRESHHOLD = 3 * DELTA_STEP
let justScrolled = false

interface NextAction {
  type: 'NEXT'
}
interface UnfreezeAction {
  type: 'UNFREEZE'
}
interface ToIndexAction {
  type: 'TO_INDEX'
  payload: number
}
interface ByAmountAction {
  type: 'BY_AMOUNT'
  payload: number
}
type TheAction = NextAction | UnfreezeAction | ToIndexAction | ByAmountAction

interface ScrollState {
  index: number
  offset: number
  dragY: number
  totalPages: number
  pageScrolled: boolean
}

const initState = (totalPages: number): ScrollState => ({
  index: 0,
  offset: 0,
  dragY: -1,
  totalPages,
  pageScrolled: false,
})

const isFirstPage = (state: ScrollState) => state.index === 0
const isLastPage = (state: ScrollState) => state.index === state.totalPages - 1

const reducer = (state: ScrollState, action: TheAction) => {
  if (state.pageScrolled) {
    return action.type === 'UNFREEZE' ? { ...state, pageScrolled: false } : state
  }
  switch (action.type) {
    case 'BY_AMOUNT':
      const relativeDelta = action.payload
      const newOffset = state.offset + action.payload
      console.log(`relDelta=${relativeDelta}, offset=${newOffset}`)
      if (isFirstPage(state) && relativeDelta < 0 && newOffset < 0) return state
      if (isLastPage(state) && relativeDelta > 0 && newOffset > TRESHHOLD) return state
      if (Math.abs(newOffset) > TRESHHOLD) {
        return {
          ...state,
          index: newOffset < 0 ? state.index - 1 : state.index + 1,
          offset: 0,
          pageScrolled: true,
        }
      }
      return {
        ...state,
        offset: newOffset
      }
    case 'TO_INDEX':
      return {
        ...state,
        index: action.payload,
        offset: 0,
        pageScrolled: true,
      }
    default:
      return state
  }
}



const useScroll = (totalSections: number) => {
  // const [index, setIndex] = useState(0)
  // const [offset, setOffset] = useState(0)
  // const [dragY, setDragY] = useState<number>()

  const [state, dispatch] = useReducer(reducer, totalSections, initState)
  useEffect(() => {
    if (state.pageScrolled) {
      setTimeout(() => {
        dispatch({ type: 'UNFREEZE' })
      }, 1000)
    }
  }, [state.pageScrolled])
  // const isFirstSection = index === 0
  // const isLastSection = index === totalSections - 1

  // if (Math.abs(offset) > 3 * DELTA_STEP && !(isFirstSection && offset < 0) && !(isLastSection && offset > 0)) {
  //   setIndex(offset < 0 ? index - 1 : index + 1)
  //   setOffset(0)
  //   justScrolled = true
  //   setTimeout(() => {
  //     justScrolled = false
  //   }, 1000)
  // }

  // const scrollByValue = (relativeDelta: number) => {
  //   if (justScrolled) return
  //   if (isFirstSection && relativeDelta < 0 && offset - relativeDelta < 0) return
  //   if (isLastSection && relativeDelta > 0 && offset / DELTA_STEP > 2) return
  //   setOffset(offset + relativeDelta)
  // }
  // const scrollByStep = (eventDelta: number) => scrollByValue(eventDelta < 0 ? - DELTA_STEP : DELTA_STEP)

  // const scrollToIndex = (i: number) => {
  //   setOffset(0)
  //   setIndex(i)
  // }

  return {
    index: state.index,
    offset: state.offset,
    absOffset: state.offset / DELTA_STEP,
    // isFirstSection,
    activeEnd: isLastPage(state) && state.offset / DELTA_STEP > 1,
    scrollByAmount: (val: number) => dispatch({ type: 'BY_AMOUNT', payload: val }),
    scrollByStep: (dir: number) => dispatch({ type: 'BY_AMOUNT', payload: dir < 0 ? - DELTA_STEP : DELTA_STEP }),
    scrollToIndex: (index: number) => dispatch({ type: 'TO_INDEX', payload: index }),
  }
}

export default useScroll