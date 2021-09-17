import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects(_, action) {
      console.log('calling setProjects', action);
      const { projects } = action.payload;
      return [ ...projects ];
    },
    // TODO why did I make this?
    updateProject(state, action) {
      const { project } = action;
      const projectIndex = state.projects.findIndex(p => p.id === project.id)
      if (projectIndex > -1) {
        state.projects[projectIndex] = project;
      } 
    }
    // TODO deleteProject
    // TODO cloneProject
  },
})

// Actions
export const {
  setProjects,
  updateProject,
} = projectsSlice.actions;

// Selectors
export const getProjects = (state) => state.projects;
export const getProject = (projectId) => (state) => state.projects.find(project => project.id === projectId);
export const getProjectScene = (projectId, sceneIndex) => (state) => {
  const project = state.projects.find(project => project.id === projectId);
  return project.scenes[sceneIndex];
}
export const getProjectSprite = (projectId, spriteIndex) => (state) => {
  const project = state.projects.find(project => project.id === projectId);
  return project.sprites[spriteIndex];
}

export default projectsSlice.reducer;
