import { createSlice } from '@reduxjs/toolkit';

import { emptyScene } from '@/App.constants';

const initialState = {
  selectedScene: { ...emptyScene },
};

export const sceneEditorSlice = createSlice({
  name: 'sceneEditor',
  initialState: { ...initialState },
  reducers: {
    // setSelectedTool(state, action) {
    //   const { tool } = action.payload;
    //   state.selectedTool = tool;
    // },
    setSelectedScene(state, action) {
      const { scene } = action.payload;
      state.selectedScene = scene;
    },
    updateSelectedSceneCell(state, action) {
      const { row, column, value } = action.payload;
      state.selectedScene.spriteSheet[row][column] = value;
    }
    // moveSceneLeft(state) {
    //   const firstRow = state.selectedScene.spriteSheet.shift();
    //   state.selectedScene.spriteSheet.push(firstRow);
    // },
    // moveSceneUp(state) {
    //   state.selectedScene.spriteSheet.forEach(row => {
    //     const lastCell = row.pop();
    //     row.unshift(lastCell);
    //   });
    // },
    // moveSceneRight(state) {
    //   const lastRow = state.selectedScene.spriteSheet.pop();
    //   state.selectedScene.spriteSheet.unshift(lastRow);
    // },
    // moveSceneDown(state) {
    //   state.selectedScene.spriteSheet.forEach(row => {
    //     const firstCell = row.shift();
    //     row.push(firstCell);
    //   });
    // },
  },
})

// Actions
export const {
  // setSelectedTool,
  setSelectedScene,
  updateSelectedSceneCell
  // moveSceneLeft,
  // moveSceneUp,
  // moveSceneRight,
  // moveSceneDown,
} = sceneEditorSlice.actions;

// Selectors
export const getSelectedScene = (state) => state.sceneEditor.selectedScene;

export default sceneEditorSlice.reducer;
