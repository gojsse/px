import React from 'react'
import { useDispatch } from 'react-redux'

import { DocumentDuplicateIcon } from '@heroicons/react/outline'

import { cloneScene } from '@store/currentProject/currentProject.actions'

const CloneSceneButton = ({ sceneIndex }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(cloneScene({ sceneIndex }))
  }

  return (
    <button
      type='button'
      className='w-1/2 relative flex column-column justify-center items-center p-2 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      onClick={handleClick}
    >
      <DocumentDuplicateIcon className='block h-4 w-4 mr-2 text-gray-200' />
      <span className='block text-xs text-gray-200'>Clone</span>
    </button>
  )
}

export default CloneSceneButton
