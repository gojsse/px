import React from 'react'

import { DocumentAddIcon } from '@heroicons/react/outline'

const NewProject = ({ onClick }) => {

  return (
    <button
      type='button'
      className='relative inline-flex column-column justify-center items-center w-full border-2 border-gray-300 border-dashed p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      onClick={onClick}
    >
      <DocumentAddIcon className='block h-5 w-5 mr-2' />
      <span className='block text-sm font-medium text-gray-900'>Create a new project</span>
    </button>
  )
}

export default NewProject
