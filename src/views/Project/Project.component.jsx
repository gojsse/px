import React from 'react';
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

const Project = (props) => {
  const { projectId, sceneIndex = 0, spriteIndex = 0 } = useParams();

  const projectName = useSelector(getProjectName);

  return (
    <div>
      <div className='mt-2 grid grid-cols-1 gap-0 lg:mb-5'>
        <div className='bg-white overflow-hidden shadow'>
          <div className='bg-gray-50 px-5 py-3'>
            projectId: {projectId} - '{projectName}'
          </div>
        </div>
        <div className='bg-white block lg:hidden mb-5'>
          <PaletteSelector />
        </div> 
      </div>

      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        <div className='bg-white shadow hidden lg:block'>
          <PaletteSelector />
        </div>
        <div className='bg-white'>
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
        <div className='bg-white'>
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
