import { getCurrentProject, setCurrentProjectPalette } from '../currentProject/currentProject.slice'

export const updatePalette = ({ palette }) => {
  return (dispatch, getState) => {
    dispatch(setCurrentProjectPalette({ palette }))
    const updatedProject = getCurrentProject(getState())
    return Promise.resolve({ projectId: updatedProject.id, updatedProject })
  }
}
