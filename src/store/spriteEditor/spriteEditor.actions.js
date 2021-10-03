import { getCurrentProject, updateCurrentProjectSprite } from '../currentProject/currentProject.slice'
import { getCurrentSpriteIndex, getCurrentSprite } from './spriteEditor.slice'

export const updateSprite = ({ index, sprite }) => {
  return (dispatch, getState) => {
    dispatch(updateCurrentProjectSprite({ index, sprite }))
    const updatedProject = getCurrentProject(getState())
    return Promise.resolve({ projectId: updatedProject.id, updatedProject })
  }
}

// TODO get this working again...
export const handleSpriteActionButton = (buttonAction) => {
  return (dispatch, getState) => {
    const spriteIndex = getCurrentSpriteIndex(getState())
    dispatch(buttonAction()) // See spriteEditor.slice for reducer cases
    const updatedSprite = getCurrentSprite(getState())
    dispatch(updateCurrentProjectSprite({ index: spriteIndex, sprite: updatedSprite }))
    const updatedProject = getCurrentProject(getState())
    return Promise.resolve({ projectId: updatedProject.id, updatedProject })
  }
}
