import { getCurrentProject, updateCurrentProjectScene, updateCurrentProjectSceneCell } from '../currentProject/currentProject.slice'
import { getCurrentSceneIndex, getCurrentScene } from './sceneEditor.slice'

export const updateScene = ({ row, column, value }) => {
  return (dispatch, getState) => {
    const sceneIndex = getCurrentSceneIndex(getState())
    dispatch(updateCurrentProjectSceneCell({ sceneIndex, row, column, value }))
    const updatedProject = getCurrentProject(getState())
    return Promise.resolve({ projectId: updatedProject.id, updatedProject })
  }
}

// TODO get this working again...
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
