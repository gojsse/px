import { createSlice } from '@reduxjs/toolkit';

import { emptyProject } from '@/App.constants.js';

// TODO this could cause a reference issue but here goes...

const initialState = {
  ...emptyProject,
  // id: null,
  // name: 'DefaultText',
  // palette: 'default',
  // dateCreated: null,
  // dateUpdated: null,
  // dateLastOpened: null,
  // sprites: [], //1-128
  // scenes: [], //1-128
  // // redoHistory: [], //in steps
  // // undoHistory: [], //in steps
};

export const currentProjectSlice = createSlice({
  name: 'currentProject',
  initialState: { ...initialState },
  reducers: {
    initializeProjectState(_, action) {
      const { project } = action.payload;
      return project;
    },
    updateProjectName(state, action) {
      const { value } = action.payload;
      state.name = value;
      state.dateUpdated = Date.now();
    },
    selectProjectPalette(state, action) {
      const { palette } = action.payload;
      state.palette = palette;
      state.dateUpdated = Date.now();
    },
    updateProjectSprite(state, action) {
      const { index, sprite } = action.payload;
      state.sprites[index] = sprite;
      state.dateUpdated = Date.now();
    },
    updateProjectScene(state, action) {
      const { index, scene } = action.payload;
      state.scenes[index] = scene;
      state.dateUpdated = Date.now();
    },
  },
})

// Actions
export const {
  initializeProjectState,
  updateProjectName,
  selectProjectPalette,
  updateProjectSprite,
  updateProjectScene,
} = currentProjectSlice.actions;

// Selectors
export const getProject = (state) => state.currentProject;
export const getProjectName = (state) => state.currentProject.name;
export const getProjectSpriteByIndex = (index) => (state) => state.currentProject.sprites[index];
export const getProjectSpritesPaged = (page = 1, amount = 16) => (state) => {
  return state.currentProject.sprites
    .filter((sprite, index) => {
      return index >= 0 && index <= (page * amount) - 1
    })
}
export const getProjectScene = (index) => (state) => state.currentProject.scenes[index];
export const getSelectedPalette = (state) => state.currentProject.palette;
export const getProjectPaletteClass = (state) => {
  return `palette palette--${!state.currentProject.palette ? "default" : state.currentProject.palette}`
}

export default currentProjectSlice.reducer;
