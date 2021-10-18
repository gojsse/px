import { createSlice } from '@reduxjs/toolkit'

import { SCENE_TOOLS } from '@/App.constants'

const initialState = {
  selectedTool: SCENE_TOOLS.MOVE,
  isDraggingSprite: false,
}

export const sceneEditorSlice = createSlice({
  name: 'sceneEditor',
  initialState: { ...initialState },
  reducers: {
    setCurrentTool(state, action) {
      const { tool } = action.payload
      state.selectedTool = tool
    },
    setIsDraggingSprite(state, action) {
      const { value } = action.payload
      state.isDraggingSprite = value
    },
  },
})

// Actions
export const {
  setCurrentTool,
  setIsDraggingSprite,
} = sceneEditorSlice.actions

// Selectors
export const getCurrentTool = (state) => state.sceneEditor.selectedTool
export const getIsDraggingSprite = (state) => state.sceneEditor.isDraggingSprite

export default sceneEditorSlice.reducer
