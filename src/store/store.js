import { configureStore } from '@reduxjs/toolkit';
import currentProjectReducer from '@store/currentProject/currentProject.slice';
import sceneEditorSlice from '@store/sceneEditor/sceneEditor.slice';
import spriteEditorSlice from '@store/spriteEditor/spriteEditor.slice';

export const store = configureStore({
  reducer: {
    currentProject: currentProjectReducer,
    sceneEditor: sceneEditorSlice,
    spriteEditor: spriteEditorSlice,
  },
});
