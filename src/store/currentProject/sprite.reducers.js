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

export const spriteReducers = {
  shiftSpriteUp(state, action) {
    const { spriteIndex } = action.payload
    shiftGridUp(state.sprites[spriteIndex])
  },
  shiftSpriteRight(state, action) {
    const { spriteIndex } = action.payload
    shiftGridRight(state.sprites[spriteIndex])
  },
  shiftSpriteDown(state, action) {
    const { spriteIndex } = action.payload
    shiftGridDown(state.sprites[spriteIndex])
  },
  shiftSpriteLeft(state, action) {
    const { spriteIndex } = action.payload
    shiftGridLeft(state.sprites[spriteIndex])
  },
  flipSpriteHorizontal(state, action) {
    const { spriteIndex } = action.payload
    flipGridHorizontal(state.sprites[spriteIndex])
  },
  flipSpriteVertical(state, action) {
    const { spriteIndex } = action.payload
    flipGridVertical(state.sprites[spriteIndex])
  },
  rotateSpriteRight(state, action) {
    const { spriteIndex } = action.payload
    const rotatedGrid = rotateGridRight(state.sprites[spriteIndex])
    state.sprites[spriteIndex] = rotatedGrid
  },
  rotateSpriteLeft(state, action) {
    const { spriteIndex } = action.payload
    const rotatedGrid = rotateGridLeft(state.sprites[spriteIndex])
    state.sprites[spriteIndex] = rotatedGrid
  },
}
