import { getProject, updateProjectSprite, updateProjectScene } from '@store/currentProject/currentProject.slice';
import { getSelectedSprite, getSelectedSpriteIndex } from '@store/spriteEditor/spriteEditor.slice';
import { getSelectedScene, getSelectedSceneIndex, updateSelectedSceneCell } from '@store/sceneEditor/sceneEditor.slice';

export const handleSpriteActionButton = (buttonAction) => {
  return (dispatch, getState) => {
    dispatch(buttonAction());
    const state = getState();
    const sprite = getSelectedSprite(state);
    const spriteIndex = getSelectedSpriteIndex(state);
    dispatch(updateProjectSprite({index: spriteIndex, sprite}));
  }
}

export const handleSceneActionButton = (buttonAction) => {
  return (dispatch, getState) => {
    dispatch(buttonAction());
    const state = getState();
    const scene = getSelectedScene(state);
    const sceneIndex = getSelectedSceneIndex(state);
    dispatch(updateProjectScene({index: sceneIndex, scene}));
  }
}

export const updateScene = (row, column, value) => {
  return (dispatch, getState) => {
    dispatch(updateSelectedSceneCell(row, column, value));
    // TODO update main project state?
    // const state = getState();
    // const currentProject = getProject(state);
    // TODO find index in main project list? trigger an update...
    // const currentProjectId = getProjectId(state);
    // const sceneIndex = getSelectedSceneIndex(state);
    // dispatch(updateProjectScene({index: sceneIndex, scene}));
  }
}
