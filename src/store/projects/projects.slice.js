// TODO I don't think we are using this slice anymore...

import { createSlice } from '@reduxjs/toolkit'

import Scene from '../../data/Scene'

const initialState = []

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects(_, action) {
      const { projects } = action.payload
      return [ ...projects ]
    },
    // TODO why did I make this?
    updateProject(state, action) {
      const { project } = action.payload
      const projectIndex = state.findIndex(p => p.id === project.id)
      if (projectIndex > -1) {
        state[projectIndex] = project
      } 
    },
    setProjectPalette(state, action) {
      const { projectId, value } = action.payload
      const projectIndex = state.findIndex(p => p.id === projectId)
      if (projectIndex > -1) {
        state[projectIndex].palette = value
      } 
    },
    insertProjectScene(state, action) {
      const { projectId } = action.payload
      const projectIndex = state.findIndex(p => p.id === projectId)
      if (projectIndex > -1) {
        state[projectIndex].scenes.push({ ...new Scene('Empty Init Scene') })
      } 
    },
    updateProjectScene(state, action) {
      const { projectId, sceneIndex, scene } = action.payload
      const projectIndex = state.findIndex(p => p.id === projectId)
      if (projectIndex > -1) {
        state[projectIndex].scenes[sceneIndex] = scene
      } 
    },
    // TODO: Delete Project Scene
    // TODO: this one too
    updateProjectSprite(state, action) {
      // const { projectId, spriteIndex, sprite } = action.payload
      // const projectIndex = state.findIndex(p => p.id === projectId)
      // if (projectIndex > -1) {
      //   state[projectIndex].scenes[sceneIndex] = scene
      // }
    },
    createNewProject(state, action) {
      const { project } = action.payload
      state.push(project)
    },
    deleteProject(state, action) {
      const { projectId } = action.payload
      const projectIndex = state.findIndex((project) => project.id === projectId)
      state.splice(projectIndex, 1)
    },
    // TODO
    cloneProject(state, action) {
      // const { project } = action.payload
      // state = state.push(project)
    }
  },
})

// Actions
export const {
  setProjects,
  updateProject,
  updateProjectSprite,
  updateProjectScene,
  insertProjectScene,
  setProjectPalette,
  createNewProject,
  deleteProject,
  cloneProject,
} = projectsSlice.actions

// Selectors
export const getProjects = (state) => state.projects
export const getProjectById = (projectId) => (state) => state.projects.find(project => project.id === projectId)
export const getProjectByIndex = (projectIndex) => (state) => state.projects.find((_, index) => index === projectIndex)
export const getProjectPalette = (projectId) => (state) => {
  const project = state.projects.find(project => project.id === projectId)
  return project.palette || 'default'
}
export const getProjectPaletteClass = (projectId) => (state) => {
  const project = state.projects.find(project => project.id === projectId)
  const palette = project.palette || 'default'
  return `palette palette--${!palette ? 'default' : palette}`
}
export const getProjectScenesCount = (projectId) => (state) => {
  const project = state.projects.find(project => project.id === projectId)
  return project.scenes.length
} 
export const getProjectScenes = (projectId) => (state) => {
  const project = state.projects.find(project => project.id === projectId)
  return project.scenes
}
export const getProjectScene = (projectId, sceneIndex) => (state) => {
  const project = state.projects.find(project => project.id === projectId)
  return project.scenes[sceneIndex]
}
export const getProjectSprites = (projectId) => (state) => {
  const project = state.projects.find(project => project.id === projectId)
  return project.sprites
}
export const getProjectSprite = (projectId, spriteIndex) => (state) => {
  const project = state.projects.find(project => project.id === projectId)
  return project.sprites[spriteIndex]
}

export default projectsSlice.reducer
