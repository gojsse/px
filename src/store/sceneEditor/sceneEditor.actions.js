import { SCENE_TOOLS } from '@/App.constants'
import { updateSceneGrid } from '@store/currentProject/currentProject.actions'

export const updateGrid = ({ grid, sceneIndex, spriteIndex, row, column }) => {
  return (dispatch, getState) => {
    const updatedGrid = grid.map((row) => [ ...row.map((cell) => cell) ])
    const selectedTool = getState().sceneEditor.selectedTool

    if (selectedTool === SCENE_TOOLS.PENCIL) {
      updatedGrid[row][column] = spriteIndex
    } else if (selectedTool === SCENE_TOOLS.ERASER) {
      updatedGrid[row][column] = null
    } else {
      return Promise.resolve()
    }

    // Only update if grids differ
    if (JSON.stringify(grid) !== JSON.stringify(updatedGrid)) {
      dispatch(updateSceneGrid({
        sceneIndex: sceneIndex,
        grid: updatedGrid
      }))
    }

    return Promise.resolve()
  }
}
