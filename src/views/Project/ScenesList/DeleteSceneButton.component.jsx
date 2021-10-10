import React from 'react'
import { useDispatch } from 'react-redux'

import { DocumentRemoveIcon } from '@heroicons/react/outline'

import { deleteScene } from '@store/currentProject/currentProject.actions'

const DeleteSceneButton = ({ sceneIndex }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(deleteScene({ sceneIndex }))
  }

  return (
    <button
      type='button'
      className='w-1/2 relative flex column-column justify-center items-center p-2 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      onClick={handleClick}
    >
      <DocumentRemoveIcon className='block h-4 w-4 mr-2 text-gray-200' />
      <span className='block text-xs text-gray-200'>Delete</span>
    </button>
  )
}

export default DeleteSceneButton
