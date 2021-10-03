import { createSlice } from '@reduxjs/toolkit'

import Project from '../../data/Project'
import Scene from '../../data/Scene'

const project = new Project('initial')

const initialState = {
  ...project.data,
  scenes: [
    ...project.data.scenes,
  ],
  sprites: [
    ...project.data.sprites,
  ],
  // id: null,
  // name: 'DefaultText',
  // palette: 'default',
  // dateCreated: null,
  // updated: null,
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
    resetCurrentProject() {
      return initialState
    },
    setCurrentProject(_, action) {
      const { project } = action.payload
      return project
    },
    setCurrentProjectName(state, action) {
      const { value } = action.payload
      state.name = value
    },
    setCurrentProjectPalette(state, action) {
      const { palette } = action.payload
      state.palette = palette
    },
    updateCurrentProjectSprite(state, action) {
      const { index, sprite } = action.payload
      state.sprites[index] = sprite
    },
    createCurrentProjectScene(state) {
      state.scenes.push(new Scene('A New Scene!'))
    },
    updateCurrentProjectScene(state, action) {
      const { index, scene } = action.payload
      state.scenes[index] = scene
    },
    updateCurrentProjectSceneCell(state, action) {
      const { sceneIndex, row, column, value } = action.payload
      state.scenes[sceneIndex].spriteSheet[row][column] = value
    },
  },
})

// Actions
export const {
  resetCurrentProject,
  setCurrentProject,
  setCurrentProjectName,
  setCurrentProjectPalette,
  updateCurrentProjectSprite,
  createCurrentProjectScene,
  updateCurrentProjectScene,
  updateCurrentProjectSceneCell,
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
export const getCurrentProjectSpriteByIndex = (index) => (state) =>  state.currentProject.sprites[index]

export default currentProjectSlice.reducer
