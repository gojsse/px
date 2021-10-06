import { currentProjectApi } from './currentProject.api'
import {
  getCurrentProject,
  resetCurrentProject,
  setCurrentProjectPalette,
  createCurrentProjectScene,
  updateCurrentProjectSceneCell,
  updateCurrentProjectSprite,
} from './currentProject.slice'

export const updatePalette = ({ palette }) => {
  return (dispatch, getState) => {
    dispatch(setCurrentProjectPalette({ palette }))
    const updatedProject = getCurrentProject(getState())
    return Promise.resolve({ projectId: updatedProject.id, updatedProject })
  }
}

export const clearThisProject = () => {
  return (dispatch) => {
    dispatch(resetCurrentProject())
    dispatch(currentProjectApi.util.invalidateTags(['Post']))
    return Promise.resolve()
  }
}

// TODO there is a bug in here somewhere...
export const addNewScene = () => {
  return (dispatch) => {
    dispatch(createCurrentProjectScene())
    // dispatch(resetCurrentProject())
    // TODO try dispatch currentProjectApi.endpoints.fetch...(id)
    // dispatch(currentProjectApi.util.invalidateTags(['Post']))
    // TODO update local storage when done... 
    return Promise.resolve()
  }
}

export const updateScene = ({ sceneIndex, row, column, value }) => {
  return (dispatch, getState) => {
    dispatch(updateCurrentProjectSceneCell({ sceneIndex, row, column, value }))
    const updatedProject = getCurrentProject(getState())
    // TODO try this instead of the resolve way...
    // dispatch(currentProjectApi.endpoints.mutations.updateProject({ projectId: updatedProject.id, updatedProject }))
    return Promise.resolve({ projectId: updatedProject.id, updatedProject })
  }
}

export const handleSceneActionButton = ({ sceneIndex, buttonAction }) => {
  return (dispatch, getState) => {
    dispatch(buttonAction({ sceneIndex }))
    const updatedProject = getCurrentProject(getState())
    return Promise.resolve({ projectId: updatedProject.id, updatedProject })
  }
}

export const copyAndPasteSprite = ({ sceneIndex, sourceIndex, targetIndex }) => {
  return (dispatch, getState) => {
    const sourceSprite = getState().currentProject.sprites[sourceIndex]
    dispatch(updateCurrentProjectSprite({ index: targetIndex, sprite: sourceSprite }))
    const updatedProject = getCurrentProject(getState())
    return Promise.resolve({ projectId: updatedProject.id, updatedProject })
  }
}

export const updateSprite = ({ index, sprite }) => {
  return (dispatch, getState) => {
    dispatch(updateCurrentProjectSprite({ index, sprite }))
    const updatedProject = getCurrentProject(getState())
    return Promise.resolve({ projectId: updatedProject.id, updatedProject })
  }
}

export const handleSpriteActionButton = ({ spriteIndex, buttonAction }) => {
  return (dispatch, getState) => {
    dispatch(buttonAction({ spriteIndex }))
    const updatedProject = getCurrentProject(getState())
    return Promise.resolve({ projectId: updatedProject.id, updatedProject })
  }
}
