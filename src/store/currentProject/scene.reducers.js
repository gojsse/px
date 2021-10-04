import {
  shiftGridUp,
  shiftGridRight,
  shiftGridDown,
  shiftGridLeft,
  flipGridHorizontal,
  flipGridVertical,
  rotateGridRight,
  rotateGridLeft,
} from "@store/store.helpers"

export const sceneReducers = {
  shiftSceneUp(state, action) {
    const { sceneIndex } = action.payload
    shiftGridUp(state.scenes[sceneIndex])
  },
  shiftSceneRight(state, action) {
    const { sceneIndex } = action.payload
    shiftGridRight(state.scenes[sceneIndex])
  },
  shiftSceneDown(state, action) {
    const { sceneIndex } = action.payload
    shiftGridDown(state.scenes[sceneIndex])
  },
  shiftSceneLeft(state, action) {
    const { sceneIndex } = action.payload
    shiftGridLeft(state.scenes[sceneIndex])
  },
  flipSceneHorizontal(state, action) {
    const { sceneIndex } = action.payload
    flipGridHorizontal(state.scenes[sceneIndex])
  },
  flipSceneVertical(state, action) {
    const { sceneIndex } = action.payload
    flipGridVertical(state.scenes[sceneIndex])
  },
  rotateSceneRight(state, action) {
    const { sceneIndex } = action.payload
    const rotatedGrid = rotateGridRight(state.scenes[sceneIndex])
    state.scenes[sceneIndex] = rotatedGrid
  },
  rotateSceneLeft(state, action) {
    const { sceneIndex } = action.payload
    const rotatedGrid = rotateGridLeft(state.scenes[sceneIndex])
    state.scenes[sceneIndex] = rotatedGrid
  },
  clearSceneSprites(state, action) {
    const { sceneIndex } = action.payload
    state.scenes[sceneIndex] = state.scenes[sceneIndex]
      .map(row => {
        return row.map(cell => {
          return null
        })
      })
  },
}
