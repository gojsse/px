import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'

import currentProjectReducer from '@store/currentProject/currentProject.slice';
import sceneEditorSlice from '@store/sceneEditor/sceneEditor.slice';
import spriteEditorSlice from '@store/spriteEditor/spriteEditor.slice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    currentProject: currentProjectReducer,
    sceneEditor: sceneEditorSlice,
    spriteEditor: spriteEditorSlice,
  },
});
