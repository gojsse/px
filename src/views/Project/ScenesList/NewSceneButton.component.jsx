import React from 'react'
import { useDispatch } from 'react-redux'

import { insertProjectScene } from '@store/projects/projects.slice'

const NewSceneButton = ({ projectId }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(insertProjectScene({ projectId }))
  }

  return (
    <button
      onClick={handleClick}
      type='button'
      className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
    >
      New
    </button>
  )
}

export default NewSceneButton
