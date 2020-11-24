import React, { useReducer, useEffect } from 'react'

const DELTA_STEP = 7
const TRESHHOLD = 3 * DELTA_STEP
const DRAG_THRESHOLD = 3 * DELTA_STEP

type MouseEvent = React.MouseEvent<HTMLElement>
type TouchEvent = React.TouchEvent<HTMLElement>

type DragEvent = MouseEvent | TouchEvent

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
interface DragStartAction {
  type: 'DRAG_START'
  payload: DragEvent
}
interface DragAction {
  type: 'DRAG'
  payload: DragEvent
}
interface DragEndAction {
  type: 'DRAG_END'
}
interface ResizeAction {
  type: 'RESIZE',
  payload: number
}
type TheAction = UnfreezeAction | ToIndexAction | ByAmountAction | DragStartAction | DragAction | DragEndAction | ResizeAction

interface InitState {
  totalPages: number,
  pageSize: number
}
interface ScrollState extends InitState {
  index: number
  offset: number
  dragY: number
  pageScrolled: boolean
}
const initState = (init: InitState): ScrollState => ({
  ...init,
  index: 0,
  offset: 0,
  dragY: -1,
  pageScrolled: false,
})

const isFirstPage = (state: ScrollState) => state.index === 0
const isLastPage = (state: ScrollState) => state.index === state.totalPages - 1


function isTouch(e: DragEvent): e is TouchEvent {
  return (e as React.TouchEvent<HTMLElement>).touches !== undefined
}

const getClient = (event: DragEvent) => {
  console.log(isTouch(event) ? `touchY: ${event.touches[0].clientY}` : `mouseY: ${event.clientY}`)
  return (
    isTouch(event) ? event.touches[0] : event
  )
}

const preventDefault = (event: DragEvent) => {
  event.preventDefault()
  event.stopPropagation()
}

const scrollBy = (state: ScrollState, amount: number): ScrollState => {
  const newOffset = state.offset + amount
  if (isFirstPage(state) && amount < 0 && newOffset < 0) return state
  if (isLastPage(state) && amount > 0 && newOffset > TRESHHOLD) return state
  if (Math.abs(newOffset) > TRESHHOLD) {
    return {
      ...state,
      index: state.index + Math.sign(newOffset),
      offset: 0,
      pageScrolled: true,
    }
  }
  return {
    ...state,
    offset: newOffset
  }
}
const dragging = (state: ScrollState, clientY: number): ScrollState => {
  const amount = (state.dragY - clientY) * 100 / state.pageSize
  const newOffset = state.offset + amount
  if (isFirstPage(state) && amount < 0 && newOffset < 0) return state
  if (isLastPage(state) && amount > 0 && newOffset > TRESHHOLD) return state
  return {
    ...state,
    dragY: clientY,
    offset: newOffset,
  }

}

const reducer = (state: ScrollState, action: TheAction) => {
  if (state.pageScrolled) {
    return action.type === 'UNFREEZE' ? { ...state, pageScrolled: false } : state
  }
  switch (action.type) {
    case 'BY_AMOUNT':
      return scrollBy(state, action.payload)
    case 'TO_INDEX':
      return {
        ...state,
        index: action.payload,
        offset: 0,
        pageScrolled: true,
      }
    case 'DRAG_START':
      if (state.dragY !== -1) return state
      preventDefault(action.payload)
      return {
        ...state,
        dragY: getClient(action.payload).clientY
      }
    case 'DRAG':
      if (state.dragY <= 0) return state
      preventDefault(action.payload)
      return dragging(state, getClient(action.payload).clientY)
    case 'DRAG_END':
      return {
        ...state,
        dragY: -1,
        index: Math.abs(state.offset) > DRAG_THRESHOLD && !((isFirstPage(state) && state.offset<0) ||  (isLastPage(state) && state.offset > 0)) ? state.index + Math.sign(state.offset) : state.index,
        offset: isLastPage(state) && state.offset > 0 ? state.offset : 0,
        pageScrolled: true
      }
    case 'RESIZE':
      return {
        ...state,
        pageSize: action.payload,
        offset: 0,
        dragY: -1,
      }
    default:
      return state
  }
}



const useScroll = (initParams: InitState) => {
  const [state, dispatch] = useReducer(reducer, initParams, initState)
  useEffect(() => {
    if (state.pageScrolled) {
      setTimeout(() => {
        dispatch({ type: 'UNFREEZE' })
      }, 1000)
    }
  }, [state.pageScrolled])

  return {
    index: state.index,
    offset: state.offset,
    absOffset: state.offset / DELTA_STEP,
    activeEnd: isLastPage(state) && state.offset / DELTA_STEP > 1,
    scrollByAmount: (val: number) => dispatch({ type: 'BY_AMOUNT', payload: val }),
    scrollByStep: (dir: number) => dispatch({ type: 'BY_AMOUNT', payload: dir < 0 ? - DELTA_STEP : DELTA_STEP }),
    scrollToIndex: (index: number) => dispatch({ type: 'TO_INDEX', payload: index }),
    startDrag: (event: DragEvent) => dispatch({ type: 'DRAG_START', payload: event }),
    drag: (event: DragEvent) => dispatch({ type: 'DRAG', payload: event }),
    endDrag: () => dispatch({ type: 'DRAG_END' }),
    resize: (h: number) => dispatch({ type: 'RESIZE', payload: h })
  }
}

export default useScroll