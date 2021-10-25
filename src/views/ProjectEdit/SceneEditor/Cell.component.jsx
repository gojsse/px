import React from 'react'

import { SCENE_TOOLS } from '@/App.constants'
import Sprite from '../Sprite/Sprite.component'

const Cell = ({
  spriteIndex,
  row,
  column,
  selectedTool,
  mouseIsDown,
  onClick,
  onDrop,
  onRemove
}) => {
  const dragOverHandler = (event) => {
    event.preventDefault()
  }

  const dropHandler = (event) => {
    event.preventDefault()
    const passedData = JSON.parse(event.dataTransfer.getData('text'))

    onDrop({
      row,
      column,
      value: passedData.spritePoolIndex
    })

    const hasValidRow = passedData.rowIndex !== null && passedData.rowIndex >= 0
    const hasValidColumn = passedData.colIndex !== null && passedData.colIndex >= 0

    // Remove sprite from grid
    if (hasValidRow && hasValidColumn) {
      if (row !== passedData.rowIndex || column !== passedData.colIndex) {
        onRemove({
          row: passedData.rowIndex,
          column: passedData.colIndex
        })
      }
    }

    event.dataTransfer.clearData()
  }

  const cellClickHandler = () => {
    onClick({
      row,
      column,
      value: spriteIndex
    })
  }

  const mouseEnterHandler = () => {
    if (mouseIsDown) {
      onClick({
        row,
        column,
        value: spriteIndex
      })
    }
  }

  const cursor = () => {
    let cursorType = 'default'
    if (selectedTool === SCENE_TOOLS.MOVE) {
      cursorType = 'grab'
    } else if (selectedTool === SCENE_TOOLS.PENCIL) {
      cursorType = 'cell'
    }
    return cursorType
  }

  return (
    <div
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
      onMouseDown={cellClickHandler}
      onMouseEnter={mouseEnterHandler}
    >
      {spriteIndex !== null && (
        <Sprite
          spriteIndex={spriteIndex}
          rowIndex={row}
          colIndex={column}
          cursor={cursor()}
          isDraggable={selectedTool === SCENE_TOOLS.MOVE}
          canDelete={true}
        />
      )}
    </div>
  )
}

export default React.memo(Cell)
