import { configureStore } from '@reduxjs/toolkit';
import currentProjectReducer from '@store/currentProject/currentProject.slice'
import spriteEditorSlice from '@store/spriteEditor/spriteEditor.slice';

export const store = configureStore({
  reducer: {
    currentProject: currentProjectReducer,
    spriteEditor: spriteEditorSlice,
  },
});
