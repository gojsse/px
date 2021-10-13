import { SPRITE_TOOLS } from '@/App.constants'
import { updateSprite } from '@store/currentProject/currentProject.actions'

export const updateGrid = ({ grid, labeledGrid, spriteIndex, row, col }) => {
  return (dispatch, getState) => {
    const updatedGrid = grid.map(row => ([ ...row.map(cell => cell) ]))
    const selectedTool = getState().spriteEditor.selectedTool
    const selectedColor = getState().spriteEditor.selectedColor

    if (selectedTool === SPRITE_TOOLS.PENCIL) {
      updatedGrid[row][col] = selectedColor
    } else if (selectedTool === SPRITE_TOOLS.ERASER) {
      updatedGrid[row][col] = null
    } else if (selectedTool === SPRITE_TOOLS.FILL) {
      const cellLabelValue = labeledGrid[row][col]
      labeledGrid.forEach((row, labeledRowIndex) => {
        row.forEach((colValue, labeledColIndex) => {                   
          if (colValue === cellLabelValue) {
            updatedGrid[labeledRowIndex][labeledColIndex] = selectedColor
          }
        })
      })
    } else {
      return Promise.resolve()
    }

    // Only update if grids differ
    if (JSON.stringify(grid) !== JSON.stringify(updatedGrid)) {
      dispatch(updateSprite({ index: spriteIndex, sprite: updatedGrid }))
    }

    return Promise.resolve()
  }
}
