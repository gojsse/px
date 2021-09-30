import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SCENE_TOOLS } from '@/App.constants'
import { updateScene } from '@store/sceneEditor/sceneEditor.actions'
import { getCurrentSpriteIndex } from '@store/spriteEditor/spriteEditor.slice'
import Sprite from '@views/Project/Sprite/Sprite.component'

import { useUpdateProjectMutation } from '@store/currentProject/currentProject.api'

const Cell = ({
  sprite,
  rowIndex,
  colIndex,
  selectedTool,
}) => {
  const dispatch = useDispatch()
  const selectedSpriteIndex = useSelector(getCurrentSpriteIndex)

  const [
    updateProject, // This is the mutation trigger
    // { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useUpdateProjectMutation()

  const dragOverHandler = event => {
    event.preventDefault()
  }

  const dropHandler = event => {
    event.preventDefault()
    const passedData = JSON.parse(event.dataTransfer.getData('text'))

    dispatch(updateScene({
      row: rowIndex,
      column: colIndex,
      value: {id: passedData.spritePoolIndex},
    })).then(({ projectId, updatedProject }) => {
      updateProject({ projectId, updatedProject })
    })

    const hasValidRow = passedData.rowIndex !== null && passedData.rowIndex >= 0
    const hasValidColumn = passedData.colIndex !== null && passedData.colIndex >= 0

    // Remove sprite from grid
    if (hasValidRow && hasValidColumn) {
      if (rowIndex !== passedData.rowIndex || colIndex !== passedData.colIndex) {
        dispatch(updateScene({
          row: passedData.rowIndex,
          column: passedData.colIndex,
          value: null,
        })).then(({ projectId, updatedProject }) => {
          updateProject({ projectId, updatedProject })
        })
      }
    }

    // TODO Remove sprite from grid if dropped outside of grid
    // setShowDeleteZone(false)
    event.dataTransfer.clearData()
  }

  const cellClickHandler = () => {
    if (selectedTool === SCENE_TOOLS.STAMP) {
      // dispatch(updateScene({
      //   row: rowIndex,
      //   column: colIndex,
      //   value: {id: selectedSpriteIndex},
      // }))
      dispatch(updateScene({
        row: rowIndex,
        column: colIndex,
        value: {id:selectedSpriteIndex},
      })).then(({ projectId, updatedProject }) => {
        updateProject({ projectId, updatedProject })
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
