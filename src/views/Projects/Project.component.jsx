import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { PencilAltIcon, CogIcon } from '@heroicons/react/solid'

import { getProjectPaletteClass, getProjectScene, getProjectSprites } from '@store/projects/projects.slice'
import Scene from '@components/Scene/Scene.component'

const Project = ({ project }) => {
  const paletteClass = useSelector(getProjectPaletteClass(project.id))
  const scene = useSelector(getProjectScene(project.id, 0))
  const sprites = useSelector(getProjectSprites(project.id))

  return (
    <div className={`${paletteClass} col-span-1 flex flex-col text-center bg-white shadow overflow-hidden divide-y divide-gray-200`}>
      <div className='flex-1 flex flex-col'>
        <h3 className='mt-6 text-gray-900 text-sm font-medium'>{project.name}</h3>
        <dl className='mt-1 flex-grow flex flex-col justify-between'>
          <dt className='sr-only'>Project Name</dt>
          <dd className='text-gray-500 text-xs'>{project.id}</dd>
          <dt className='sr-only'>ID</dt>
          <dd className='mt-3'>
            <Scene scene={scene} sprites={sprites} />
          </dd>
        </dl>
      </div>
      <div>
        <div className='-mt-px flex divide-x divide-gray-200'>
          <div className='w-0 flex-1 flex'>
            <NavLink
              exact
              to={`/project/${project.id}/0/0`}
              className='relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500'
            >
              <PencilAltIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
              <span className='ml-3'>Open</span>
            </NavLink>
          </div>
          <div className='-ml-px w-0 flex-1 flex'>
            {/* <a
              href={`/`}
              className='relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500'
            >
              <CogIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
              <span className='ml-3'>Settings</span>
            </a> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project
