import { createSlice } from '@reduxjs/toolkit'

import { SPRITE_TOOLS, COLOR_KEYS } from '@/App.constants'
// import { currentProjectApi } from '../currentProject/currentProject.api'

const initialState = {
  selectedTool: SPRITE_TOOLS.PENCIL,
  selectedColor: COLOR_KEYS[0],
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
} = spriteEditorSlice.actions

// Selectors
export const getCurrentTool = (state) => state.spriteEditor.selectedTool
export const getCurrentColor = (state) => state.spriteEditor.selectedColor

export default spriteEditorSlice.reducer
