import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { PencilAltIcon, DocumentRemoveIcon } from '@heroicons/react/outline'
// DocumentDuplicateIcon

import Scene from '@components/Scene/Scene.component'
import Modal from '@components/Modal/Modal.component'

const buttonClass = 'relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-2 text-1xs font-medium border border-transparent hover:text-gray-500'
const iconClass = 'w-5 h-5 mr-2'

const Project = ({ project, onConfirmDelete }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const scene = project.scenes[0]
  const sprites = project.sprites
  const paletteClass = `palette palette--${!project.palette ? 'default' : project.palette}`

  const confirmClickHandler = () => {
    onConfirmDelete(project.id)
    setIsDeleteOpen(false)
  }

  return (
    <div className={`${paletteClass} col-span-1 flex flex-col text-center bg-white shadow overflow-hidden divide-y divide-gray-200`}>
      <div className='flex-1 flex flex-col'>
        <h3 className='mt-6 text-gray-900 text-sm font-medium'>{project.name}</h3>
        <dl className='mt-1 flex-grow flex flex-col justify-between'>
          <dt className='sr-only'>Project Name</dt>
          <dd className='text-gray-500 text-xs'>{project.id}</dd>
          <dt className='sr-only'>ID</dt>
          <dd className='mt-3'>
            <NavLink exact to={`/projects/${project.id}/0/0`}>
              <Scene scene={scene} sprites={sprites} />
            </NavLink>
          </dd>
        </dl>
      </div>
      <div>
        <div className='-mt-px flex divide-x divide-gray-200'>
          <div className='w-0 flex-1 flex'>
            <NavLink
              exact
              to={`/projects/${project.id}/0/0`}
              className={buttonClass + ' text-gray-700'}
            >
              <PencilAltIcon className={iconClass + ' text-gray-700'} aria-hidden='true' />
              <span>Open</span>
            </NavLink>
          </div>
          {/* <div className='w-0 flex-1 flex'>
            <button
              className={buttonClass + ' text-gray-400 cursor-not-allowed'}
              onClick={() => console.log('add dupe function')}
            >
              <DocumentDuplicateIcon className={iconClass + ' text-gray-400'} aria-hidden='true' />
              <span>Clone</span>
            </button>
          </div> */}
          <div className='w-0 flex-1 flex'>
            <button
              className={buttonClass + ' text-gray-700'}
              onClick={() => setIsDeleteOpen(true)}
            >
              <DocumentRemoveIcon className={iconClass + ' text-gray-700'} aria-hidden='true' />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} confirmHandler={confirmClickHandler}>
        <form className='bg-white mt-5 sm:flex'>
          <div className='w-full'>
            Are you sure you want to delete {project.id}?
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Project
