import { createSlice } from '@reduxjs/toolkit'

import { SCENE_TOOLS, EMPTY_SCENE } from '@/App.constants'

const initialState = {
  selectedTool: SCENE_TOOLS.MOVE,
  selectedScene: { ...EMPTY_SCENE },
  selectedSceneIndex: 0,
}

export const sceneEditorSlice = createSlice({
  name: 'sceneEditor',
  initialState: { ...initialState },
  reducers: {
    setCurrentTool(state, action) {
      const { tool } = action.payload
      state.selectedTool = tool
    },
    setCurrentScene(state, action) {
      const { scene } = action.payload
      state.selectedScene = scene
    },
    // TODO do we need? this is handled via params, right?
    setCurrentSceneIndex(state, action) {
      const { sceneIndex } = action.payload
      state.selectedSceneIndex = sceneIndex
    },
    updateCurrentSceneCell(state, action) {
      const { row, column, value } = action.payload
      state.selectedScene.spriteSheet[row][column] = value
    },


    flipSceneHorizontal(state) {
      state.selectedScene.spriteSheet.forEach((row, index) => {
        state.selectedScene.spriteSheet[index] = row.reverse()
      })
    },
    flipSceneVertical(state) {
      state.selectedScene.spriteSheet.reverse()
    },
    moveSceneLeft(state) {
      state.selectedScene.spriteSheet.forEach(row => {
        const firstCell = row.shift()
        row.push(firstCell)
      })
    },
    moveSceneUp(state) {
      const firstRow = state.selectedScene.spriteSheet.shift()
      state.selectedScene.spriteSheet.push(firstRow)
    },
    moveSceneRight(state) {
      state.selectedScene.spriteSheet.forEach(row => {
        const lastCell = row.pop()
        row.unshift(lastCell)
      })
    },
    moveSceneDown(state) {
      const lastRow = state.selectedScene.spriteSheet.pop()
      state.selectedScene.spriteSheet.unshift(lastRow)
    },
    clearSceneSprites(state) {
      state.selectedScene.spriteSheet = state.selectedScene.spriteSheet
        .map(row => {
          return row.map(cell => {
            return null
          })
        })
    }
  },
})

// Actions
export const {
  setCurrentTool,
  setCurrentScene,
  setCurrentSceneIndex,
  updateCurrentSceneCell,
  flipSceneHorizontal,
  flipSceneVertical,
  moveSceneLeft,
  moveSceneUp,
  moveSceneRight,
  moveSceneDown,
  clearSceneSprites,
} = sceneEditorSlice.actions

// Selectors
export const getCurrentTool = (state) => state.sceneEditor.selectedTool
export const getCurrentScene = (state) => state.sceneEditor.selectedScene
export const getCurrentSceneName = (state) => state.sceneEditor.selectedScene.name
export const getCurrentSceneIndex = (state) => state.sceneEditor.selectedSceneIndex

export default sceneEditorSlice.reducer
