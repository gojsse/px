import { currentProjectApi } from '@store/currentProject/currentProject.api'
import { resetCurrentProject } from '@store/currentProject/currentProject.slice'
import { getCurrentProject, setCurrentProjectPalette } from '../currentProject/currentProject.slice'

export const updatePalette = ({ palette }) => {
  return (dispatch, getState) => {
    dispatch(setCurrentProjectPalette({ palette }))
    const updatedProject = getCurrentProject(getState())
    return Promise.resolve({ projectId: updatedProject.id, updatedProject })
  }
}

export const clearThisProject = () => {
  return (dispatch, getState) => {
    dispatch(resetCurrentProject())
    dispatch(currentProjectApi.util.invalidateTags(['Post']))
    return Promise.resolve()
  }
}
