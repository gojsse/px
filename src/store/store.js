import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
// import logger from 'redux-logger'

import { allProjectsApi } from './projects/allProjects.api'
import { currentProjectApi } from './currentProject/currentProject.api'

import projectsSlice from '@store/projects/projects.slice'
import currentProjectSlice from '@store/currentProject/currentProject.slice'
import sceneEditorSlice from '@store/sceneEditor/sceneEditor.slice'
import spriteEditorSlice from '@store/spriteEditor/spriteEditor.slice'

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    // .concat(logger)
    .concat(allProjectsApi.middleware)
    .concat(currentProjectApi.middleware),
  reducer: {
    [allProjectsApi.reducerPath]: allProjectsApi.reducer,
    [currentProjectApi.reducerPath]: currentProjectApi.reducer,
    projects: projectsSlice,
    currentProject: currentProjectSlice,
    sceneEditor: sceneEditorSlice,
    spriteEditor: spriteEditorSlice,
  },
})

setupListeners(store.dispatch)
