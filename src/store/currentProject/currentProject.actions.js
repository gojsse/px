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
  updateCurrentProjectSceneGrid,
  updateCurrentProjectSceneCell,
  updateCurrentProjectSprite
} from './currentProject.slice'

const updateLocalProject = () => {
  return (dispatch, getState) => {
    const project = getCurrentProject(getState())
    dispatch(currentProjectApi.endpoints.updateProject.initiate({ project }))
    return Promise.resolve()
  }
}

export const clearThisProject = () => {
  return (dispatch) => {
    dispatch(resetCurrentProject())
    dispatch(currentProjectApi.util.invalidateTags(['Post']))
    return Promise.resolve()
  }
}

export const updateProjectName = ({ value }) => {
  return (dispatch) => {
    dispatch(setCurrentProjectName({ value }))
    return dispatch(updateLocalProject())
  }
}

export const updatePalette = ({ palette }) => {
  return (dispatch) => {
    dispatch(setCurrentProjectPalette({ palette }))
    return dispatch(updateLocalProject())
  }
}

export const addNewScene = () => {
  return (dispatch, getState) => {
    const scene = new Scene({ name: 'A New Scene!' }).data
    dispatch(createCurrentProjectScene({ scene }))
    dispatch(updateLocalProject())
    const updatedProject = getCurrentProject(getState())
    return Promise.resolve({ newSceneIndex: updatedProject.scenes.length - 1 })
  }
}

export const cloneScene = ({ sceneIndex }) => {
  return (dispatch) => {
    dispatch(cloneCurrentProjectScene({ sceneIndex }))
    return dispatch(updateLocalProject())
  }
}

export const deleteScene = ({ sceneIndex }) => {
  return (dispatch) => {
    dispatch(deleteCurrentProjectScene({ sceneIndex }))
    return dispatch(updateLocalProject())
  }
}

export const updateSceneGrid = ({ sceneIndex, grid }) => {
  return (dispatch) => {
    dispatch(updateCurrentProjectSceneGrid({ sceneIndex, grid }))
    return dispatch(updateLocalProject())
  }
}

export const updateSceneCell = ({ sceneIndex, row, column, value }) => {
  return (dispatch) => {
    dispatch(updateCurrentProjectSceneCell({ sceneIndex, row, column, value }))
    return dispatch(updateLocalProject())
  }
}

export const handleSceneActionButton = ({ sceneIndex, buttonAction }) => {
  return (dispatch) => {
    dispatch(buttonAction({ sceneIndex }))
    return dispatch(updateLocalProject())
  }
}

export const copyAndPasteSprite = ({ sourceIndex, targetIndex }) => {
  return (dispatch, getState) => {
    const sourceSprite = getState().currentProject.present.sprites[sourceIndex]
    dispatch(updateCurrentProjectSprite({ index: targetIndex, sprite: sourceSprite }))
    return dispatch(updateLocalProject())
  }
}

export const updateSprite = ({ index, sprite }) => {
  return (dispatch) => {
    dispatch(updateCurrentProjectSprite({ index, sprite }))
    return dispatch(updateLocalProject())
  }
}

export const handleSpriteActionButton = ({ spriteIndex, buttonAction }) => {
  return (dispatch) => {
    dispatch(buttonAction({ spriteIndex }))
    return dispatch(updateLocalProject())
  }
}

export const undoLastChange = () => {
  return (dispatch) => {
    dispatch(ActionCreators.undo())
    return dispatch(updateLocalProject())
  }
}

export const redoLastChange = () => {
  return (dispatch) => {
    dispatch(ActionCreators.redo())
    return dispatch(updateLocalProject())
  }
}
