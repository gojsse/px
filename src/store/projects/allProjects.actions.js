export const createProject = ({ project }) => {
  return (dispatch, getState) => {
    // dispatch(createNewProject({ project }))
    return Promise.resolve({ project })
  }
}

export const deleteProject = (projectId) => {
  return (dispatch, getState) => {
    // dispatch(someDeleteFunction({ projectId }))
    return Promise.resolve(projectId)
  }
}
