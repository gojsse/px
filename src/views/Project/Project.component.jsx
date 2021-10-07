import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from 'redux-undo'

import { Menu, Transition } from '@headlessui/react'
import { CogIcon } from '@heroicons/react/solid'

import { clearThisProject, undoLastChange, redoLastChange } from '@store/currentProject/currentProject.actions'
import { useReadProjectByIdQuery } from '@store/currentProject/currentProject.api'
import {
  getCurrentProjectName,
  getCurrentProjectUpdatedReadable,
  getCurrentProjectPaletteClass,
  setCurrentProject,
  canUndoCurrentProject,
  canRedoCurrentProject
} from '@store/currentProject/currentProject.slice'

import PaletteSelector from '@views/Project/PaletteSelector/PaletteSelector.component'
import ScenesList from '@views/Project/ScenesList/ScenesList.component'
import SceneInfoBar from '@views/Project/SceneInfoBar/SceneInfoBar.component'
import SceneEditorToolbar from '@views/Project/SceneEditorToolbar/SpriteEditorToolbar.component'
import SceneEditorActionbar from '@views/Project/SceneEditorActionbar/SceneEditorActionbar.component'
import SceneEditor from '@views/Project/SceneEditor/SceneEditor.component'
import SpriteList from '@views/Project/SpriteList/SpriteList.component'
import SpriteInfoBar from '@views/Project/SpriteInfoBar/SpriteInfoBar.component'
import SpriteEditorToolbar from '@views/Project/SpriteEditorToolbar/SpriteEditorToolbar.component'
import SpriteEditorActionbar from '@views/Project/SpriteEditorActionbar/SpriteEditorActionbar.component'
import SpriteEditor from '@views/Project/SpriteEditor/SpriteEditor.component'
import ColorSelector from '@views/Project/ColorSelector/ColorSelector.component'

const Project = (props) => {
  const { projectId, sceneIndex = 0, spriteIndex = 0 } = useParams()
  const { data, isLoading } = useReadProjectByIdQuery(projectId)

  const dispatch = useDispatch()
  const projectName = useSelector(getCurrentProjectName)
  const projectUpdatedReadable = useSelector(getCurrentProjectUpdatedReadable)
  const projectPaletteClass = useSelector(getCurrentProjectPaletteClass)
  const canUndo = useSelector(canUndoCurrentProject)
  const canRedo = useSelector(canRedoCurrentProject)

  const disabledClass = ' opacity-50 cursor-not-allowed'

  // Set current project in currentProject slice when loaded from the API
  useEffect(() => {
    if (isLoading === false) {
      dispatch(setCurrentProject({ project: data }))
      dispatch(ActionCreators.clearHistory())
    }
  }, [dispatch, data, isLoading])

  // Clear out the current project data from the store when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearThisProject())
      dispatch(ActionCreators.clearHistory())
    }
  }, [dispatch])

  const undoClickHandler = () => {
    if (canUndo) {
      dispatch(undoLastChange())
    }
  }

  const redoClickHandler = () => {
    if (canRedo) {
      dispatch(redoLastChange())
    }
  }

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-10">
      <div className='relative mt-2 grid grid-cols-1 gap-0 mb-5'>
        <div className='bg-white shadow flex justify-between items-center'>
          <div className='flex items-center justify-center h-full divide-x divide-gray-200 bg-gray-50 px-5 py-3'>
            <div className='h-full px-5 y-3'>{projectName}</div>
            <div className='h-full px-5 y-3'>{projectId}</div>
            <div className='h-full px-5 y-3'>{projectUpdatedReadable}</div>
          </div>

          <div className='flex items-center justify-center h-full divide-x divide-gray-200 border-l text-xs'>
            <button
              className={`h-full px-5 y-3 border-b-4 ${!canUndo ? disabledClass : ''}`}
              onClick={() => undoClickHandler()}
              disabled={!canUndo}
            >
              undo
            </button>
            <button
              className={`h-full px-5 y-3 border-b-4 ${!canRedo ? disabledClass : ''}`}
              onClick={() => redoClickHandler()}
              disabled={!canRedo}
            >
              redo
            </button>
          </div>

          <Menu as='div' className='inline-block lg:hidden text-left h-full'>
            <Menu.Button className='h-full inline-flex justify-center items-center px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'>
              <CogIcon className='h-5 w-5' aria-hidden='true' />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='origin-top-right absolute right-0 mt-2 w-full shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10'>
                <div className='py-1'>
                  <div className='bg-white mb-5'>
                    <PaletteSelector />
                  </div>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        <div className='hidden lg:block'>
          <div className={`bg-white shadow mb-2 ${projectPaletteClass}`}>
            <ScenesList sceneIndex={sceneIndex} spriteIndex={spriteIndex} />
          </div>
          <div className='bg-white shadow mb-2'>
            <PaletteSelector />
          </div>
        </div>
        <div className={`flex flex-col bg-white ${projectPaletteClass}`}>
          <div className='shadow'>
            <SceneInfoBar sceneIndex={sceneIndex} />
            <div className='bg-indigo-100 bg-stripes bg-stripes-white shadow-sm border-t border-gray-100'>
              <SceneEditorToolbar />
              <SceneEditorActionbar sceneIndex={sceneIndex} />
            </div>
          </div>
          <div className='shadow'>
            <SceneEditor sceneIndex={sceneIndex} />
          </div>
          <div className='bg-indigo-100 bg-stripes bg-stripes-white p-1'></div>
          <SpriteList />
        </div>
        <div className={`flex flex-col bg-white ${projectPaletteClass}`}>
          <div className='shadow'>
            <SpriteInfoBar spriteIndex={spriteIndex} />
            <div className='bg-indigo-100 bg-stripes bg-stripes-white shadow-sm border-t border-gray-100'>
              <SpriteEditorToolbar />
              <SpriteEditorActionbar spriteIndex={spriteIndex} />
            </div>
          </div>
          <div className='shadow'>
            <SpriteEditor spriteIndex={spriteIndex} />
          </div>
          <div className='bg-indigo-100 bg-stripes bg-stripes-white p-1'></div>
          <ColorSelector />
        </div>
      </div>

      {!isLoading && (
        <div className='mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {/* {JSON.stringify(data)} */}
        </div>
      )}
    </div>
  )
}

export default Project
