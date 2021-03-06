import { Fragment, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from 'redux-undo'

import { Menu, Transition } from '@headlessui/react'
import { CogIcon } from '@heroicons/react/solid'

import { useReadProjectByIdQuery } from '@store/currentProject/currentProject.api'
import { clearThisProject, updateProjectName } from '@store/currentProject/currentProject.actions'
import { getCurrentProjectName, getCurrentProjectUpdatedReadable, getCurrentProjectPaletteClass, setCurrentProject } from '@store/currentProject/currentProject.slice'

import TextInput from '@components/forms/TextInput.component'
import PaletteSelector from './PaletteSelector/PaletteSelector.component'
// import ScenesList from './ScenesList/ScenesList.component'
import SceneInfoBar from './SceneInfoBar/SceneInfoBar.component'
import SceneEditorToolbar from './SceneEditorToolbar/SpriteEditorToolbar.component'
import SceneEditorActionbar from './SceneEditorActionbar/SceneEditorActionbar.component'
import SceneEditor from './SceneEditor/SceneEditor.component'
import SpriteList from './SpriteList/SpriteList.component'
import SpriteEditor from './SpriteEditor/SpriteEditor.component'
import UndoRedo from './UndoRedo.component'

const ProjectEdit = () => {
  const { projectId, sceneIndex = 0, spriteIndex = 0 } = useParams()
  const history = useHistory()
  const { data, isLoading } = useReadProjectByIdQuery(projectId)

  const dispatch = useDispatch()
  const projectName = useSelector(getCurrentProjectName)
  const projectUpdatedReadable = useSelector(getCurrentProjectUpdatedReadable)
  const projectPaletteClass = useSelector(getCurrentProjectPaletteClass)

  // Set current project in currentProject slice when loaded from the API
  useEffect(() => {
    if (isLoading === false) {
      dispatch(ActionCreators.clearHistory())
      // Bad or missing data
      if (data === null || 'scenes' in data === false) {
        history.push('/projects')
        return
      }
      dispatch(setCurrentProject({ project: data }))
      dispatch(ActionCreators.clearHistory())
    }
  }, [dispatch, history, isLoading, data])

  useEffect(() => {
    if (isLoading === false) {
      // Missing scenes
      if ('scenes' in data === false) {
        history.push('/projects')
        return
      }
      // Trying to view invalid or non existent scene
      if (sceneIndex > data.scenes.length - 1 || sceneIndex in data.scenes === false) {
        history.push(`/projects/${projectId}/0/${spriteIndex}`)
        dispatch(ActionCreators.clearHistory())
        return
      }
    }
  }, [dispatch, history, isLoading, data, projectId, sceneIndex, spriteIndex])

  // Clear out the current project data from the store when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearThisProject())
      dispatch(ActionCreators.clearHistory())
    }
  }, [dispatch])

  if (spriteIndex > 127) {
    history.push(`/projects/${projectId}/0/0`)
    return <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 pt-10'>????</div>
  }

  return (
    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 pt-10'>
      <div className='mt-2'>
        <div className='flex items-center justify-end divide-x text-gray-500 divide-gray-500'>
          <div className='flex items-center text-xs h-full px-5 y-3'>
            {projectId}
          </div>
          <div className='flex items-center text-xs h-full px-5 y-3'>
            {projectUpdatedReadable}
          </div>
        </div>
      </div>

      <div className='relative mt-2 grid grid-cols-1 gap-0 mb-5'>
        <div className='bg-white shadow flex justify-between items-center'>
          <div className='flex items-center justify-center h-full divide-x divide-gray-200 bg-gray-50'>
            <div className='h-full'>
              <TextInput
                value={projectName}
                minLength={1}
                maxLength={40}
                onChange={(value) => dispatch(updateProjectName({ value }))}
              />
            </div>
          </div>

          <UndoRedo />

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
          {/* MOVE to project/id */}
          {/* <div className={`bg-white shadow mb-2 ${projectPaletteClass}`}>
            <ScenesList sceneIndex={sceneIndex} spriteIndex={spriteIndex} />
          </div> */}
          <div className='bg-white shadow mb-2'>
            <PaletteSelector />
          </div>
        </div>
        <div className={`shadow flex flex-col bg-white ${projectPaletteClass}`}>
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

        <SpriteEditor spriteIndex={spriteIndex} />
      </div>
    </div>
  )
}

export default ProjectEdit
