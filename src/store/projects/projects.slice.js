import { createSlice } from '@reduxjs/toolkit'

import { EMPTY_SCENE } from '@/App.constants.js'

const initialState = []

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects(_, action) {
      console.log('calling setProjects', action)
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
    updateProjectScene(state, action) {
      const { projectId, sceneIndex, scene } = action.payload
      const projectIndex = state.findIndex(p => p.id === projectId)
      if (projectIndex > -1) {
        state[projectIndex].scenes[sceneIndex] = scene
      } 
    },
    insertProjectScene(state, action) {
      const { projectId } = action.payload
      const projectIndex = state.findIndex(p => p.id === projectId)
      if (projectIndex > -1) {
        state[projectIndex].scenes.push({
          ...EMPTY_SCENE,
          id: 'blah'
        })
      } 
      console.log('state[projectIndex].scenes', EMPTY_SCENE)
    },
    setProjectPalette(state, action) {
      const { projectId, value } = action.payload
      const projectIndex = state.findIndex(p => p.id === projectId)
      if (projectIndex > -1) {
        state[projectIndex].palette = value
      } 
    },
    createNewProject(state, action) {
      const { project } = action.payload
      state.push(project)
    }
    // TODO deleteProject
    // TODO cloneProject
  },
})

// Actions
export const {
  setProjects,
  updateProject,
  updateProjectScene,
  insertProjectScene,
  setProjectPalette,
  createNewProject,
} = projectsSlice.actions

// Selectors
export const getProjects = (state) => state.projects
export const getProject = (projectId) => (state) => state.projects.find(project => project.id === projectId)
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
export const getProjectScene = (projectId, sceneIndex) => (state) => {
  const project = state.projects.find(project => project.id === projectId)
  return project.scenes[sceneIndex]
}
export const getProjectSprites = (projectId) => (state) => {
  console.log('project.id === projectId', projectId, state.projects[0].id)
  const project = state.projects.find(project => project.id === projectId)
  return project.sprites
}
export const getProjectSprite = (projectId, spriteIndex) => (state) => {
  const project = state.projects.find(project => project.id === projectId)
  return project.sprites[spriteIndex]
}

export default projectsSlice.reducer
