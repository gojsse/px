import React from 'react'
import { useDispatch } from 'react-redux'

import { SPRITE_TOOLS } from '@/App.constants'
import { setCurrentColor } from '@store/spriteEditor/spriteEditor.slice'

const Cell = (props) => {
  const {
    row,
    column,
    colorKey,
    selectedTool,
    mouseIsDown,
    clickHandler,
  } = props

  const dispatch = useDispatch()

  const cellClickHandler = () => {
    if (selectedTool === SPRITE_TOOLS.COLOR_SAMPLE) {
      dispatch(setCurrentColor({color: colorKey}))
      return
    }
    clickHandler({ row, column })
  }

  const mouseEnterHandler = () => {
    if (selectedTool === SPRITE_TOOLS.COLOR_SAMPLE && mouseIsDown) {
      dispatch(setCurrentColor({color: colorKey}))
      return
    }
    if (mouseIsDown) {
      clickHandler({ row, column })
    }
  }

  return (
    <button
      className={`color color--${colorKey}`}
      onMouseDown={cellClickHandler}
      onMouseEnter={mouseEnterHandler}
    />
  )
}

export default React.memo(Cell)
