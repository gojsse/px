import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import NewProject from '../../data/Project'

import { getProjects, createNewProject } from '@store/projects/projects.slice'
import Project from './Project.component'
import Modal from '@components/Modal/Modal.component'

const Projects = (props) => {
  const dispatch = useDispatch()
  const projects = useSelector(getProjects)
  const [isOpen, setIsOpen] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')

  const handleCreateNewProjectConfirm = () => {
    const newProject = new NewProject(newProjectName)
    dispatch(createNewProject({ project: { ...newProject } }))
    setNewProjectName('')
  }

  return (
    <div>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4'>
        {projects.map((project) => (
          <Project key={project.id} project={project} />
        ))}
      </div>

      <button
        onClick={() => setIsOpen(true)}
        type='button'
        className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      >
        New
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} confirmHandler={handleCreateNewProjectConfirm}>
        <form className='bg-white shadow mt-5 sm:flex sm:items-center'>
          <div className='w-full sm:max-w-xs'>
            <label htmlFor='email' className='sr-only'>
              Name
            </label>
            <input
              type='text'
              name='new-project-name'
              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
              placeholder='Something COoOl'
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
            />
          </div>
          {/* <button
            type='submit'
            className='mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
          >
            Save
          </button> */}
        </form>
      </Modal>
    </div>
  )
}

export default Projects
