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
    shiftGridUp(state.scenes[sceneIndex].spriteSheet)
  },
  shiftSceneRight(state, action) {
    const { sceneIndex } = action.payload
    shiftGridRight(state.scenes[sceneIndex].spriteSheet)
  },
  shiftSceneDown(state, action) {
    const { sceneIndex } = action.payload
    shiftGridDown(state.scenes[sceneIndex].spriteSheet)
  },
  shiftSceneLeft(state, action) {
    const { sceneIndex } = action.payload
    shiftGridLeft(state.scenes[sceneIndex].spriteSheet)
  },
  flipSceneHorizontal(state, action) {
    const { sceneIndex } = action.payload
    flipGridHorizontal(state.scenes[sceneIndex].spriteSheet)
  },
  flipSceneVertical(state, action) {
    const { sceneIndex } = action.payload
    flipGridVertical(state.scenes[sceneIndex].spriteSheet)
  },
  rotateSceneRight(state, action) {
    const { sceneIndex } = action.payload
    const rotatedGrid = rotateGridRight(state.scenes[sceneIndex].spriteSheet)
    state.scenes[sceneIndex] = rotatedGrid
  },
  rotateSceneLeft(state, action) {
    const { sceneIndex } = action.payload
    const rotatedGrid = rotateGridLeft(state.scenes[sceneIndex].spriteSheet)
    state.scenes[sceneIndex] = rotatedGrid
  },
  clearSceneSprites(state, action) {
    const { sceneIndex } = action.payload
    state.scenes[sceneIndex].spriteSheet = state.scenes[sceneIndex].spriteSheet
      .map(row => {
        return row.map(cell => {
          return null
        })
      })
  },
}
