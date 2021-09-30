import { createSlice } from '@reduxjs/toolkit'

import { SPRITE_TOOLS, COLOR_KEYS } from '@/App.constants'
// import { currentProjectApi } from '../currentProject/currentProject.api'

const initialState = {
  selectedTool: SPRITE_TOOLS.PENCIL,
  selectedColor: COLOR_KEYS[0],
  selectedSprite: [],
  selectedSpriteIndex: 0,
}

export const spriteEditorSlice = createSlice({
  name: 'spriteEditor',
  initialState: { ...initialState },
  reducers: {
    setCurrentTool(state, action) {
      const { tool } = action.payload
      state.selectedTool = tool
    },
    setCurrentColor(state, action) {
      const { color } = action.payload
      state.selectedColor = color
    },
    setCurrentSprite(state, action) {
      const { sprite } = action.payload
      state.selectedSprite = sprite
    },
    setCurrentSpriteIndex(state, action) {
      const { spriteIndex } = action.payload
      state.selectedSpriteIndex = spriteIndex
    },
    flipSpriteHorizontal(state) {
      state.selectedSprite.forEach((row, index) => {
        state.selectedSprite[index] = row.reverse()
      })
    },
    flipSpriteVertical(state) {
      state.selectedSprite.reverse()
    },
    moveSpriteUp(state) {
      const firstRow = state.selectedSprite.shift()
      state.selectedSprite.push(firstRow)
    },
    moveSpriteRight(state) {
      state.selectedSprite.forEach(row => {
        const lastCell = row.pop()
        row.unshift(lastCell)
      })
    },
    moveSpriteDown(state) {
      const lastRow = state.selectedSprite.pop()
      state.selectedSprite.unshift(lastRow)
    },
    moveSpriteLeft(state) {
      state.selectedSprite.forEach(row => {
        const firstCell = row.shift()
        row.push(firstCell)
      })
    },
    rotateSpriteRight(state) {
      const tempSprite = state.selectedSprite.map(row => ([ ...row.map(cell => cell) ]))
      state.selectedSprite.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          tempSprite[cellIndex][state.selectedSprite.length - rowIndex - 1] = cell
        })
      })
      state.selectedSprite = tempSprite
    },
    rotateSpriteLeft(state) {
      const tempSprite = state.selectedSprite.map(row => ([ ...row.map(cell => cell) ]))
      state.selectedSprite.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          tempSprite[state.selectedSprite.length - cellIndex - 1][rowIndex] = cell
        })
      })
      state.selectedSprite = tempSprite
    },
  },
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     currentProjectApi.endpoints.readProjectById.matchFulfilled,
  //     (state, { payload }) => {
  //       console.log('should do magic here...', payload, state.selectedSpriteIndex)
  //       // state.selectedSprite = payload.sprite
  //       // state.selectedSpriteIndex = payload.spriteIndex
  //     }
  //   )
  // },
})

// Actions
export const {
  setCurrentTool,
  setCurrentColor,
  setCurrentSprite,
  setCurrentSpriteIndex,
  flipSpriteHorizontal,
  flipSpriteVertical,
  moveSpriteLeft,
  moveSpriteUp,
  moveSpriteRight,
  moveSpriteDown,
  rotateSpriteRight,
  rotateSpriteLeft,
} = spriteEditorSlice.actions

// Selectors
export const getCurrentTool = (state) => state.spriteEditor.selectedTool
export const getCurrentColor = (state) => state.spriteEditor.selectedColor
export const getCurrentSprite = (state) => state.spriteEditor.selectedSprite
export const getCurrentSpriteIndex = (state) => state.spriteEditor.selectedSpriteIndex

export default spriteEditorSlice.reducer
