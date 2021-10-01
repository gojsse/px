import React, { useState } from 'react'

import NewProjectClass from '../../data/Project'
import { useGetAllProjectsQuery } from '@store/projects/allProjects.api'
import { useCreateNewProjectMutation, useDeleteProjectMutation } from '@store/projects/allProjects.api'
import Project from './Project.component'
import NewProject from './NewProject.component'
import Modal from '@components/Modal/Modal.component'
import Select from '@components/forms/Select.component'

const templates = [
  {name: 'Empty', id: '001'},
  {name: 'Basic', id: '002'},
  {name: 'Faces', id: '003'},
  {name: 'Board', id: '004'},
]

const Projects = (props) => {
  const { data = [] } = useGetAllProjectsQuery()

  const [createNewProject] = useCreateNewProjectMutation()
  const [deleteProject] = useDeleteProjectMutation()

  const [isOpen, setIsOpen] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')

  const handleCreateNewProjectConfirm = () => {
    const { data } = new NewProjectClass(newProjectName)
    const project = data
    createNewProject({ project })
    setNewProjectName('')
  }

  const handleDeleteProjectConfirm = (projectId) => {
    deleteProject({ projectId })
  }

  return (
    <div>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-10'>
        {data.map((project) => (
          <Project key={project.id} project={project} onConfirmDelete={handleDeleteProjectConfirm} />
        ))}
        <NewProject onClick={() => setIsOpen(true)} />
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} confirmHandler={handleCreateNewProjectConfirm}>
        <form className='bg-white mt-5 sm:flex'>
          <div className='w-full sm:max-w-xs'>
            <label htmlFor='new-project-name' className='block text-sm font-medium text-gray-700'>
              New Project Name
            </label>
            <input
              name='new-project-name'
              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 mb-2'
              type='text'
              placeholder='New Project Name'
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
            />
            <Select label={'New Project Template'} items={templates} onChange={() => {console.log('changed')}} />
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Projects
