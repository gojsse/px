import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDraggingSprite: false
};

export const projectEditorSlice = createSlice({
  name: 'projectEditor',
  initialState: { ...initialState },
  reducers: {
    // setSelectedTool(state, action) {
    //   const { tool } = action.payload;
    //   state.selectedTool = tool;
    // },
  },
})

// Actions
export const {
  // setSelectedTool,
} = projectEditorSlice.actions;

// Selectors
// export const getSelectedScene = (state) => state.sceneEditor.selectedScene;

export default projectEditorSlice.reducer;
