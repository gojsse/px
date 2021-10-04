import { createSlice } from '@reduxjs/toolkit'

import Project from '../../data/Project'
import Scene from '../../data/Scene'
import { sceneReducers } from './scene.reducers'
import { spriteReducers } from './sprite.reducers'

const project = new Project({ name: 'initial' })

const initialState = {
  ...project.data,
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
      state.scenes.push(new Scene({ name: 'A New Scene!' }).data)
    },
    updateCurrentProjectScene(state, action) {
      const { index, scene } = action.payload
      state.scenes[index] = scene
    },
    updateCurrentProjectSceneCell(state, action) {
      const { sceneIndex, row, column, value } = action.payload
      state.scenes[sceneIndex].spriteSheet[row][column] = value
    },
    ...sceneReducers,
    ...spriteReducers,
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
  // Manipulate a scene
  shiftSceneLeft,
  shiftSceneUp,
  shiftSceneRight,
  shiftSceneDown,
  flipSceneHorizontal,
  flipSceneVertical,
  clearSceneSprites,
  // Manipulate a sprite
  shiftSpriteLeft,
  shiftSpriteUp,
  shiftSpriteRight,
  shiftSpriteDown,
  flipSpriteHorizontal,
  flipSpriteVertical,
  rotateSpriteRight,
  rotateSpriteLeft,
} = currentProjectSlice.actions

const getPaletteClass = (state) => {
  const palette = state.currentProject.palette
  return `palette palette--${!palette ? 'default' : palette}`
}

// Project selectors
export const getCurrentProject = (state) => state.currentProject
export const getCurrentProjectId = (state) => state.currentProject.id
export const getCurrentProjectName = (state) => state.currentProject.name
export const getCurrentProjectUpdated = (state) => state.currentProject.updated
export const getCurrentProjectUpdatedReadable = (state) => new Date(state.currentProject.updated).toLocaleDateString('en-US')

// Palette selectors
export const getCurrentProjectPalette = (state) => state.currentProject.palette
export const getCurrentProjectPaletteClass = (state) => getPaletteClass(state)

// Scene selectors
export const getCurrentProjectScenes = (state) => state.currentProject.scenes
export const getCurrentProjectScenesCount = (state) => state.currentProject.scenes.length 
export const getCurrentProjectScene = (index) => (state) => state.currentProject.scenes[index]
export const getCurrentProjectSceneName = (index) => (state) => state.currentProject.scenes[index].name

// Sprite selectors
export const getCurrentProjectSprites = (state) => state.currentProject.sprites
export const getCurrentProjectSpriteByIndex = (index) => (state) =>  state.currentProject.sprites[index]

export default currentProjectSlice.reducer
