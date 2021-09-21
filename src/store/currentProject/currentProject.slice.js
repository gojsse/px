import { createSlice } from '@reduxjs/toolkit'

import { EMPTY_PROJECT } from '@/App.constants.js'

// TODO this could cause a reference issue but here goes...

const initialState = {
  ...EMPTY_PROJECT,
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
}

export const currentProjectSlice = createSlice({
  name: 'currentProject',
  initialState: { ...initialState },
  reducers: {
    setSelectedProject(_, action) {
      const { project } = action.payload
      return project
    },
    setSelectedProjectName(state, action) {
      const { value } = action.payload
      state.name = value
      state.dateUpdated = Date.now()
    },
    setSelectedProjectPalette(state, action) {
      const { value } = action.payload
      state.palette = value
      state.dateUpdated = Date.now()
    },
    updateSelectedProjectSprite(state, action) {
      const { index, sprite } = action.payload
      state.sprites[index] = sprite
      state.dateUpdated = Date.now()
    },
    updateSelectedProjectScene(state, action) {
      const { index, scene } = action.payload
      state.scenes[index] = scene
      state.dateUpdated = Date.now()
    },
  },
})

// Actions
export const {
  setSelectedProject,
  setSelectedProjectName,
  setSelectedProjectPalette,
  updateSelectedProjectSprite,
  updateSelectedProjectScene,
} = currentProjectSlice.actions

// Selectors
export const getSelectedProject = (state) => state.currentProject
export const getSelectedProjectId = (state) => state.currentProject.id
export const getSelectedProjectName = (state) => state.currentProject.name
export const getSelectedProjectPalette = (state) => state.currentProject.palette
export const getSelectedProjectPaletteClass = (state) => {
  return `palette palette--${!state.currentProject.palette ? 'default' : state.currentProject.palette}`
}
export const getSelectedProjectSprites = (state) => state.currentProject.sprites
export const getSelectedProjectSpriteByIndex = (index) => (state) => state.currentProject.sprites[index]
export const getSelectedProjectSpritesPaged = (page = 1, amount = 16) => (state) => {
  return state.currentProject.sprites
    .filter((_, index) => {
      return index >= 0 && index <= (page * amount) - 1
    })
}
export const getSelectedProjectScenes = (state) => state.currentProject.scenes
export const getSelectedProjectScene = (index) => (state) => state.currentProject.scenes[index]


export default currentProjectSlice.reducer
