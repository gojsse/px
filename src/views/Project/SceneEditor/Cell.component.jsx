import React from 'react'
import { useParams } from 'react-router'

import { SCENE_TOOLS } from '@/App.constants'
import Sprite from '@views/Project/Sprite/Sprite.component'

const Cell = ({
  sprite,
  rowIndex,
  colIndex,
  selectedTool,
  mouseIsDown,
  onChange
}) => {
  const { spriteIndex } = useParams()

  const dragOverHandler = event => {
    event.preventDefault()
  }

  const dropHandler = event => {
    event.preventDefault()
    const passedData = JSON.parse(event.dataTransfer.getData('text'))

    onChange({
      row: rowIndex,
      column: colIndex,
      value: {id: passedData.spritePoolIndex},
    })

    const hasValidRow = passedData.rowIndex !== null && passedData.rowIndex >= 0
    const hasValidColumn = passedData.colIndex !== null && passedData.colIndex >= 0

    // Remove sprite from grid
    if (hasValidRow && hasValidColumn) {
      if (rowIndex !== passedData.rowIndex || colIndex !== passedData.colIndex) {
        onChange({
          row: passedData.rowIndex,
          column: passedData.colIndex,
          value: null,
        })
      }
    }

    // TODO Remove sprite from grid if dropped outside of grid, currently there
    // is no way to delete a sprite from the grid. other option, make drag to trash can to delete.
    // setShowDeleteZone(false)
    event.dataTransfer.clearData()
  }

  const cellClickHandler = () => {
    if (selectedTool === SCENE_TOOLS.STAMP) {
      onChange({
        row: rowIndex,
        column: colIndex,
        value: {id: spriteIndex},
      })
    }
  }

  const mouseEnterHandler = () => {
    if (mouseIsDown) {
      onChange({
        row: rowIndex,
        column: colIndex,
        value: {id: spriteIndex},
      })
    }
  }

  const cursor = () => {
    let cursorType = 'default'
    if (selectedTool === SCENE_TOOLS.MOVE) {
      cursorType = 'grab'
    } else if (selectedTool === SCENE_TOOLS.STAMP) {
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
      {sprite !== null && (
        <Sprite
          key={sprite.id}
          spriteIndex={sprite.id}
          rowIndex={rowIndex}
          colIndex={colIndex}
          cursor={cursor()}
          isDraggable={selectedTool === SCENE_TOOLS.MOVE}
        />
      )}
    </div>
  )
}

export default React.memo(Cell)
