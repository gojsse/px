import { getCurrentProject, setCurrentProjectPalette } from '../currentProject/currentProject.slice'

export const updatePalette = ({ palette }) => {
  return (dispatch, getState) => {
    const project = getCurrentProject(getState())

    dispatch(setCurrentProjectPalette({ palette }))

    const updatedProject = {
      ...project,
      palette: palette,
      updated: Date.now(),
    }

    return Promise.resolve({ projectId: project.id, updatedProject })
  }
}
