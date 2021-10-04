import { createSlice } from '@reduxjs/toolkit'

import { SCENE_TOOLS } from '@/App.constants'

const initialState = {
  selectedTool: SCENE_TOOLS.MOVE,
}

export const sceneEditorSlice = createSlice({
  name: 'sceneEditor',
  initialState: { ...initialState },
  reducers: {
    setCurrentTool(state, action) {
      const { tool } = action.payload
      state.selectedTool = tool
    },
  },
})

// Actions
export const {
  setCurrentTool,
} = sceneEditorSlice.actions

// Selectors
export const getCurrentTool = (state) => state.sceneEditor.selectedTool

export default sceneEditorSlice.reducer
