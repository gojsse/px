import React from 'react'
import { useHistory, useParams } from 'react-router'
import { useDispatch } from 'react-redux'

import { DocumentAddIcon } from '@heroicons/react/outline'

import { addNewScene } from '@store/currentProject/currentProject.actions'

const NewSceneButton = ({ projectId }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { spriteIndex } = useParams()

  const handleClick = () => {
    dispatch(addNewScene({ projectId }))
      .then(({ newSceneIndex }) => {
        history.push(`/projects/${projectId}/${newSceneIndex}/${spriteIndex}`)
      })
  }

  return (
    <button
      type='button'
      className='relative flex column-column justify-center items-center w-full border-2 mt-2 border-gray-300 border-dashed p-2 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      onClick={handleClick}
    >
      <DocumentAddIcon className='block h-5 w-5 mr-2' />
      <span className='block text-sm font-medium text-gray-900'>New Scene</span>
    </button>
  )
}

export default NewSceneButton
