import { createSlice } from '@reduxjs/toolkit'

import { EMPTY_PROJECT } from '@/App.constants.js'

const initialState = {
  ...EMPTY_PROJECT,
  // id: null,
  // name: 'DefaultText',
  // palette: 'default',
  // dateCreated: null,
  // updated: null,
  // dateLastOpened: null,
  // sprites: [], //1-128|256
  // scenes: [], //1-128|256
  // // redoHistory: [], //in steps
  // // undoHistory: [], //in steps
}

export const currentProjectSlice = createSlice({
  name: 'currentProject',
  initialState: { ...initialState },
  reducers: {
    setCurrentProject(_, action) {
      const { project } = action.payload
      return project
    },
    setCurrentProjectName(state, action) {
      const { value } = action.payload
      state.name = value
      state.updated = Date.now()
    },
    setCurrentProjectPalette(state, action) {
      const { palette } = action.payload
      state.palette = palette
      state.updated = Date.now()
    },
    updateCurrentProjectSprite(state, action) {
      const { index, sprite } = action.payload
      state.sprites[index] = sprite
      state.updated = Date.now()
    },
    updateCurrentProjectScene(state, action) {
      const { index, scene } = action.payload
      state.scenes[index] = scene
      state.updated = Date.now()
    },
  },
})

// Actions
export const {
  setCurrentProject,
  setCurrentProjectName,
  setCurrentProjectPalette,
  updateCurrentProjectSprite,
  updateCurrentProjectScene,
} = currentProjectSlice.actions

// Selectors
export const getCurrentProject = (state) => state.currentProject
export const getCurrentProjectId = (state) => state.currentProject.id
export const getCurrentProjectName = (state) => state.currentProject.name
export const getCurrentProjectUpdated = (state) => state.currentProject.updated
export const getCurrentProjectUpdatedReadable = (state) => new Date(state.currentProject.updated).toLocaleDateString('en-US')
export const getCurrentProjectPalette = (state) => state.currentProject.palette
export const getCurrentProjectPaletteClass = (state) => {
  return `palette palette--${!state.currentProject.palette ? 'default' : state.currentProject.palette}`
}
export const getCurrentProjectScenes = (state) => state.currentProject.scenes
export const getCurrentProjectScenesCount = (state) => state.currentProject.scenes.length 
export const getCurrentProjectScene = (index) => (state) => state.currentProject.scenes[index]
export const getCurrentProjectSprites = (state) => state.currentProject.sprites
export const getCurrentProjectSpriteByIndex = (index) => (state) => state.currentProject.sprites[index]
export const getCurrentProjectSpritesPaged = (page = 1, amount = 16) => (state) => {
  return state.currentProject.sprites
    .filter((_, index) => {
      return index >= 0 && index <= (page * amount) - 1
    })
}

export default currentProjectSlice.reducer
