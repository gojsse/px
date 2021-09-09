import { updateProjectSprite, updateProjectScene } from '@store/currentProject/currentProject.slice';
import { getSelectedSprite, getSelectedSpriteIndex } from '@store/spriteEditor/spriteEditor.slice';
import { getSelectedScene, getSelectedSceneIndex } from '@store/sceneEditor/sceneEditor.slice';

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
