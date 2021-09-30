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
    // console.log('setItem > createProjectInStorage', value, response)
    return response
  } catch (err) {
    // console.log(err)
    return err
  }
}

export const readProjectInStorage = async (projectKey) => {
  let response = []

  try {
    const projectResponse = await projectsTable.getItem(projectKey)
    response = projectResponse
    // console.log('getSingleProjectInStorage', response)
  } catch (err) {
    response = err
    // console.log('getSingleProjectInStorage error', response)
  }

  return response
}

export const updateProjectInStorage = async (projectId, value) => {

  try {
    // console.log('updateProjectInStorage executing... ', projectId, value)
    const response = await projectsTable.setItem(projectId, value)
    // console.log('setItem > updateProjectInStorage', projectId, value, response)
    return response
  } catch (err) {
    // console.log(err)
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
    // console.log('getAllProjectsInStorage', response)
  } catch (err) {
    response = err
    // console.log('getAllProjectsInStorage error', response)
  }

  return response
}
