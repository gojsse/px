import { getCurrentProject, updateCurrentProjectSprite } from '../currentProject/currentProject.slice'
import { getCurrentSpriteIndex, getCurrentSprite, setCurrentSprite } from './spriteEditor.slice'

export const updateSprite = ({ sprite }) => {
  return (dispatch, getState) => {
    const project = getCurrentProject(getState())
    const spriteIndex = getCurrentSpriteIndex(getState())

    dispatch(setCurrentSprite({ sprite }))
    const updatedSprite = getCurrentSprite(getState())
    dispatch(updateCurrentProjectSprite({ index: spriteIndex, sprite: updatedSprite }))

    const updatedProject = {
      ...project,
      sprites: [
        ...project.sprites
      ],
    }
    updatedProject.sprites[spriteIndex] = updatedSprite

    return Promise.resolve({ projectId: project.id, updatedProject })
  }
}

export const handleSpriteActionButton = (buttonAction) => {
  return (dispatch, getState) => {
    const project = getCurrentProject(getState())
    const spriteIndex = getCurrentSpriteIndex(getState())

    dispatch(buttonAction()) // See spriteEditor.slice for reducer cases
    const updatedSprite = getCurrentSprite(getState())
    dispatch(updateCurrentProjectSprite({ index: spriteIndex, sprite: updatedSprite }))

    const updatedProject = {
      ...project,
      sprites: [
        ...project.sprites
      ],
    }
    updatedProject.sprites[spriteIndex] = updatedSprite

    return Promise.resolve({ projectId: project.id, updatedProject })
  }
}
