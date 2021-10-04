import React, { useState } from 'react'

// TODO move to actions maybe to keep this component cleaner
import EmptyProject from '../../data/Project'
import BasicProject from '../../data/project-templates/BasicProject'
import FacesProject from '../../data/project-templates/FacesProject'
import BoardProject from '../../data/project-templates/BoardProject'

import { useGetAllProjectsQuery } from '@store/projects/allProjects.api'
import { useCreateNewProjectMutation, useDeleteProjectMutation } from '@store/projects/allProjects.api'
import Project from './Project.component'
import NewProject from './NewProject.component'
import Modal from '@components/Modal/Modal.component'
import Select from '@components/forms/Select.component'

const templates = [
  {name: 'Empty', id: '001', class: EmptyProject},
  {name: 'Basic', id: '002', class: BasicProject},
  {name: 'Faces', id: '003', class: FacesProject},
  {name: 'Board', id: '004', class: BoardProject},
]

const Projects = (props) => {
  const { data = [] } = useGetAllProjectsQuery()

  const [createNewProject] = useCreateNewProjectMutation()
  const [deleteProject] = useDeleteProjectMutation()

  const [isOpen, setIsOpen] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])

  const handleCreateNewProjectConfirm = () => {
    const { data } = new selectedTemplate.class({ name: newProjectName })
    createNewProject({ project: data })
    setNewProjectName('')
    setSelectedTemplate(templates[0])
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
      </div>

      <NewProject onClick={() => setIsOpen(true)} />

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} confirmHandler={handleCreateNewProjectConfirm} canSubmit={newProjectName && newProjectName.length > 0}>
        <form className='bg-white mt-5 w-full flex'>
          <div className='w-full'>
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
            <Select
              label={'New Project Template'}
              items={templates}
              selected={selectedTemplate}
              onChange={setSelectedTemplate}
            />
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Projects
