import localforage from 'localforage'

const nameSpace = 'PX'

localforage.config({
  name: nameSpace,
  version: 1.0,
  description : 'PX application storage.'
})

const projectsTable = localforage.createInstance({
  name: `${nameSpace}/projects`,
  storeName: 'projects',
  description : 'Your PX projects.'
})

export const createProjectInStorage = async (project) => {

  try {
    const response = await projectsTable.setItem(project.id, project)
    return response
  } catch (err) {
    return err
  }
}

export const readProjectInStorage = async (projectKey) => {
  let response = []

  try {
    const projectResponse = await projectsTable.getItem(projectKey)
    response = projectResponse
  } catch (err) {
    response = err
  }

  return response
}

export const updateProjectInStorage = async (project) => {

  try {
    const response = await projectsTable.setItem(project.id, project)
    return response
  } catch (err) {
    return err
  }
}

export const deleteProjectInStorage = async (projectId) => {

  try {
    await projectsTable.removeItem(projectId)
  } catch (err) {
    return err
  }

  return projectId
}

const getAllProjectKeys = async () => {
  let response = []

  try {
    response = await projectsTable.keys()
  } catch (err) {
    response = err
  }

  return response
}

export const getAllProjectsInStorage = async () => {
  let response = []

  try {
    const projectKeys = await getAllProjectKeys()

    for (let index = 0; index < projectKeys.length; index++) {
      const projectResponse = await projectsTable.getItem(projectKeys[index])
      projectResponse.key = projectKeys[index]
      response.push(projectResponse)
    }
  } catch (err) {
    response = err
  }

  return response
}
