import { getCurrentProject, updateCurrentProjectScene } from '../currentProject/currentProject.slice'
import { getCurrentSceneIndex, getCurrentScene, updateCurrentSceneCell } from './sceneEditor.slice'

export const updateScene = ({ row, column, value }) => {
  return (dispatch, getState) => {
    const sceneIndex = getCurrentSceneIndex(getState())
    dispatch(updateCurrentSceneCell({ row, column, value }))
    const updatedScene = getCurrentScene(getState())
    dispatch(updateCurrentProjectScene({ index: sceneIndex, scene: updatedScene }))
    const updatedProject = getCurrentProject(getState())
    return Promise.resolve({ projectId: updatedProject.id, updatedProject })
  }
}

export const handleSceneActionButton = (buttonAction) => {
  return (dispatch, getState) => {
    const sceneIndex = getCurrentSceneIndex(getState())
    dispatch(buttonAction()) // See spriteEditor.slice for reducer cases
    const updatedScene = getCurrentScene(getState())
    dispatch(updateCurrentProjectScene({ index: sceneIndex, scene: updatedScene }))
    const updatedProject = getCurrentProject(getState())
    return Promise.resolve({ projectId: updatedProject.id, updatedProject })
  }
}
