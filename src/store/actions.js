import { updateProjectSprite } from '@store/currentProject/currentProject.slice';
import { getSelectedSprite, getSelectedSpriteIndex } from '@store/spriteEditor/spriteEditor.slice';

export const handleSpriteActionButton = (buttonAction) => {
  return (dispatch, getState) => {
    dispatch(buttonAction());
    const state = getState();
    const sprite = getSelectedSprite(state);//getState().spriteEditor.selectedSprite;
    const spriteIndex = getSelectedSpriteIndex(state);//getState().spriteEditor.selectedSpriteIndex;
    dispatch(updateProjectSprite({index: spriteIndex, sprite}));
  }
}
