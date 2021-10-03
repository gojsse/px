import { currentProjectApi } from '@store/currentProject/currentProject.api'
import { resetCurrentProject } from '@store/currentProject/currentProject.slice'
import { getCurrentProject, createCurrentProjectScene, setCurrentProjectPalette } from './currentProject.slice'

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
