import { createSlice } from '@reduxjs/toolkit'

import Project from '../../data/Project'
import { sceneReducers } from './scene.reducers'
import { spriteReducers } from './sprite.reducers'

const project = new Project({ name: 'initial' })

const initialState = {
  ...project.data,
  // id: null,
  // name: 'DefaultText',
  // palette: 'default',
  // created: null,
  // updated: null,
  // sprites: [], //1-128
  // scenes: [], //1-128
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
    createCurrentProjectScene(state, action) {
      const { scene } = action.payload
      state.scenes.push({ ...scene, updated: Date.now() })
      state.updated = Date.now()
    },
    cloneCurrentProjectScene(state, action) {
      const { sceneIndex } = action.payload
      state.scenes.splice(sceneIndex + 1, 0, { ...state.scenes[sceneIndex], updated: Date.now() })
      state.updated = Date.now()
    },
    deleteCurrentProjectScene(state, action) {
      const { sceneIndex } = action.payload
      state.scenes.splice(sceneIndex, 1)
      state.updated = Date.now()
    },
    updateCurrentProjectScene(state, action) {
      const { sceneIndex, scene } = action.payload
      state.scenes[sceneIndex] = { ...scene, updated: Date.now() }
      state.updated = Date.now()
    },
    updateCurrentProjectSceneGrid(state, action) {
      const { sceneIndex, grid } = action.payload
      state.scenes[sceneIndex] = {
        ...state.scenes[sceneIndex],
        spriteSheet: grid,
        updated: Date.now()
      }
      state.updated = Date.now()
    },
    updateCurrentProjectSceneCell(state, action) {
      const { sceneIndex, row, column, value } = action.payload
      state.scenes[sceneIndex].spriteSheet[row][column] = value
      state.scenes[sceneIndex].updated = Date.now()
      state.updated = Date.now()
    },
    ...sceneReducers,
    ...spriteReducers,
  },
  extraReducers: {

  }
})

// Actions
export const {
  resetCurrentProject,
  setCurrentProject,
  setCurrentProjectName,
  setCurrentProjectPalette,
  updateCurrentProjectSprite,
  createCurrentProjectScene,
  cloneCurrentProjectScene,
  deleteCurrentProjectScene,
  updateCurrentProjectScene,
  updateCurrentProjectSceneGrid,
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
  const palette = state.currentProject.present.palette
  return `palette palette--${!palette ? 'default' : palette}`
}

// Project selectors
export const getCurrentProject = (state) => state.currentProject.present
export const getCurrentProjectId = (state) => state.currentProject.present.id
export const getCurrentProjectName = (state) => state.currentProject.present.name
export const getCurrentProjectUpdated = (state) => state.currentProject.present.updated
export const getCurrentProjectUpdatedReadable = (state) => {
  const date = new Date(state.currentProject.present.updated).toLocaleDateString('en-US')
  const time = new Date(state.currentProject.present.updated).toLocaleTimeString("en-US")
  return `${date} - ${time}`
}

// Palette selectors
export const getCurrentProjectPalette = (state) => state.currentProject.present.palette
export const getCurrentProjectPaletteClass = (state) => getPaletteClass(state)

// Scene selectors
export const getCurrentProjectScenes = (state) => state.currentProject.present.scenes
export const getCurrentProjectScenesCount = (state) => state.currentProject.present.scenes.length 
export const getCurrentProjectScene = (index) => (state) => state.currentProject.present.scenes[index] ?? {spriteSheet: []}
export const getCurrentProjectSceneName = (index) => (state) => state.currentProject.present.scenes[index]?.name

// Sprite selectors
export const getCurrentProjectSprites = (state) => state.currentProject.present.sprites
export const getCurrentProjectSpriteByIndex = (index) => (state) => state.currentProject.present.sprites[index]

// Undo/Redo
export const canUndoCurrentProject = (state) => state.currentProject.past.length > 0
export const canRedoCurrentProject = (state) => state.currentProject.future.length > 0

export default currentProjectSlice.reducer
