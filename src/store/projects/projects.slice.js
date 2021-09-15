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

export default projectsSlice.reducer;
