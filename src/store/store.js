import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import projectsSlice from '@store/projects/projects.slice'
import currentProjectSlice from '@store/currentProject/currentProject.slice'
import sceneEditorSlice from '@store/sceneEditor/sceneEditor.slice'
import spriteEditorSlice from '@store/spriteEditor/spriteEditor.slice'

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    projects: projectsSlice,
    currentProject: currentProjectSlice,
    sceneEditor: sceneEditorSlice,
    spriteEditor: spriteEditorSlice,
  },
})
