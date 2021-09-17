import React, { Fragment } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
// import ReactJson from 'react-json-view';

import { getProjectName } from '@store/currentProject/currentProject.slice';

import PaletteSelector from '@views/Project/PaletteSelector/PaletteSelector.component';

import SceneInfoBar from '@views/Project/SceneInfoBar/SceneInfoBar.component';
import SceneEditorToolbar from '@views/Project/SceneEditorToolbar/SpriteEditorToolbar.component';
import SceneEditorActionbar from '@views/Project/SceneEditorActionbar/SceneEditorActionbar.component';
import SceneEditor from '@views/Project/SceneEditor/SceneEditor.component';
import SpriteList from '@views/Project/SpriteList/SpriteList.component';
import SpriteInfoBar from '@views/Project/SpriteInfoBar/SpriteInfoBar.component';
import SpriteEditorToolbar from '@views/Project/SpriteEditorToolbar/SpriteEditorToolbar.component';
import SpriteEditorActionbar from '@views/Project/SpriteEditorActionbar/SpriteEditorActionbar.component';
import SpriteEditor from '@views/Project/SpriteEditor/SpriteEditor.component';
import ColorSelector from '@views/Project/ColorSelector/ColorSelector.component';

import { Menu, Transition } from '@headlessui/react';
import { CogIcon } from '@heroicons/react/solid';

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

const Project = (props) => {
  const { projectId, sceneIndex = 0, spriteIndex = 0 } = useParams();

  const projectName = useSelector(getProjectName);

  return (
    <div>
      <div className='relative mt-2 grid grid-cols-1 gap-0 mb-5'>
        <div className='bg-white shadow flex justify-between items-center'>
          <div className='bg-gray-50 px-5 py-3'>
            '{projectName}' / ID:{projectId}
          </div>

          <Menu as='div' className='inline-block lg:hidden  text-left h-full'>
            <Menu.Button className='h-full inline-flex justify-center items-center w-32 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'>
              Settings
              <CogIcon className='-mr-1 ml-2 h-5 w-5' aria-hidden='true' />
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
        <div className='bg-white shadow hidden lg:block'>
          <PaletteSelector />
        </div>
        <div className='flex flex-col bg-white'>
          <div className='shadow'>
            <SceneInfoBar sceneIndex={sceneIndex} />
            <div className='bg-gray-200 bg-stripes bg-stripes-white shadow-sm'>
              <SceneEditorToolbar />
              <SceneEditorActionbar />
            </div>
          </div>
          <SceneEditor sceneIndex={sceneIndex} />
          <SpriteList />
        </div>
        <div className='flex flex-col bg-white'>
          <div className='shadow'>
            <SpriteInfoBar spriteIndex={spriteIndex} />
            <div className='bg-gray-200 bg-stripes bg-stripes-white shadow-sm'>
              <SpriteEditorToolbar />
              <SpriteEditorActionbar />
            </div>
          </div>
          <SpriteEditor spriteIndex={spriteIndex} />
          <ColorSelector />
        </div>
      </div>

      {/* <div className='mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        <ReactJson src={JSON.parse(JSON.stringify(project))} />
      </div> */}
    </div>
  )
}

export default Project;
