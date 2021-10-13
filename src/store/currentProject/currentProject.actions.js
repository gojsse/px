import { ActionCreators } from 'redux-undo'

import Scene from '../../data/Scene'

import { currentProjectApi } from './currentProject.api'
import {
  setCurrentProjectName,
  getCurrentProject,
  resetCurrentProject,
  setCurrentProjectPalette,
  createCurrentProjectScene,
  cloneCurrentProjectScene,
  deleteCurrentProjectScene,
  updateCurrentProjectSceneCell,
  updateCurrentProjectSprite,
} from './currentProject.slice'

export const clearThisProject = () => {
  return (dispatch) => {
    dispatch(resetCurrentProject())
    dispatch(currentProjectApi.util.invalidateTags(['Post']))
    return Promise.resolve()
  }
}

export const updateProjectName = ({ value }) => {
  return (dispatch, getState) => {
    dispatch(setCurrentProjectName({ value }))
    const updatedProject = getCurrentProject(getState())
    dispatch(currentProjectApi.endpoints.updateProject.initiate({ projectId: updatedProject.id, updatedProject }))
  }
}

export const updatePalette = ({ palette }) => {
  return (dispatch, getState) => {
    dispatch(setCurrentProjectPalette({ palette }))
    const updatedProject = getCurrentProject(getState())
    return Promise.resolve({ projectId: updatedProject.id, updatedProject })
  }
}

export const addNewScene = () => {
  return (dispatch, getState) => {
    const scene = new Scene({ name: 'A New Scene!' }).data
    dispatch(createCurrentProjectScene({ scene }))
    const updatedProject = getCurrentProject(getState())
    dispatch(currentProjectApi.endpoints.updateProject.initiate({ projectId: updatedProject.id, updatedProject }))
    return Promise.resolve({ newSceneIndex: updatedProject.scenes.length - 1 })
  }
}

export const cloneScene = ({ sceneIndex }) => {
  return (dispatch, getState) => {
    dispatch(cloneCurrentProjectScene({ sceneIndex }))
    const updatedProject = getCurrentProject(getState())
    dispatch(currentProjectApi.endpoints.updateProject.initiate({ projectId: updatedProject.id, updatedProject }))
    return Promise.resolve()
  }
}

export const deleteScene = ({ sceneIndex }) => {
  return (dispatch, getState) => {
    dispatch(deleteCurrentProjectScene({ sceneIndex }))
    const updatedProject = getCurrentProject(getState())
    dispatch(currentProjectApi.endpoints.updateProject.initiate({ projectId: updatedProject.id, updatedProject }))
    return Promise.resolve()
  }
}

export const updateScene = ({ sceneIndex, row, column, value }) => {
  return (dispatch, getState) => {
    dispatch(updateCurrentProjectSceneCell({ sceneIndex, row, column, value }))
    const updatedProject = getCurrentProject(getState())
    dispatch(currentProjectApi.endpoints.updateProject.initiate({ projectId: updatedProject.id, updatedProject }))
    return Promise.resolve()
  }
}

export const handleSceneActionButton = ({ sceneIndex, buttonAction }) => {
  return (dispatch, getState) => {
    dispatch(buttonAction({ sceneIndex }))
    const updatedProject = getCurrentProject(getState())
    return Promise.resolve({ projectId: updatedProject.id, updatedProject })
  }
}

export const copyAndPasteSprite = ({ sourceIndex, targetIndex }) => {
  return (dispatch, getState) => {
    const sourceSprite = getState().currentProject.present.sprites[sourceIndex]
    dispatch(updateCurrentProjectSprite({ index: targetIndex, sprite: sourceSprite }))
    const updatedProject = getCurrentProject(getState())
    return Promise.resolve({ projectId: updatedProject.id, updatedProject })
  }
}

export const updateSprite = ({ index, sprite }) => {
  return (dispatch, getState) => {
    dispatch(updateCurrentProjectSprite({ index, sprite }))
    const updatedProject = getCurrentProject(getState())
    dispatch(currentProjectApi.endpoints.updateProject.initiate({ projectId: updatedProject.id, updatedProject }))
    return Promise.resolve()
  }
}

export const handleSpriteActionButton = ({ spriteIndex, buttonAction }) => {
  return (dispatch, getState) => {
    dispatch(buttonAction({ spriteIndex }))
    const updatedProject = getCurrentProject(getState())
    return Promise.resolve({ projectId: updatedProject.id, updatedProject })
  }
}

export const undoLastChange = () => {
  return (dispatch, getState) => {
    dispatch(ActionCreators.undo())
    const updatedProject = getCurrentProject(getState())
    dispatch(currentProjectApi.endpoints.updateProject.initiate({ projectId: updatedProject.id, updatedProject }))
    return Promise.resolve()
  }
}

export const redoLastChange = () => {
  return (dispatch, getState) => {
    dispatch(ActionCreators.redo())
    const updatedProject = getCurrentProject(getState())
    // updates via query api outside component
    dispatch(currentProjectApi.endpoints.updateProject.initiate({ projectId: updatedProject.id, updatedProject }))
    return Promise.resolve()
  }
}
