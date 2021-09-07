import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
// import ReactJson from 'react-json-view';

import { getProjectName } from '@store/currentProject/currentProject.slice';

import PaletteSelector from '@views/Project/PaletteSelector/PaletteSelector.component';

import SceneEditor from '@views/Project/SceneEditor/SceneEditor.component';
import SpriteList from '@views/Project/SpriteList/SpriteList.component';
import SpriteEditorToolbar from '@views/Project/SpriteEditorToolbar/SpriteEditorToolbar.component';
import SpriteEditorActionbar from '@views/Project/SpriteEditorActionbar/SpriteEditorActionbar.component';
import SpriteEditor from '@views/Project/SpriteEditor/SpriteEditor.component';

const Project = (props) => {
  const { projectId, sceneIndex = 0, spriteIndex = 0 } = useParams();

  const projectName = useSelector(getProjectName);

  return (
    <div>
      <div className="mt-2 grid grid-cols-1 gap-5">
        <div className="bg-white overflow-hidden shadow">
          <div className="bg-gray-50 px-5 py-3">
            projectId: {projectId} - "{projectName}"
          </div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div>
            {/* scene setting, palette, etc. can be shrunken */}
            <PaletteSelector />
        </div>
        <div>
            <SceneEditor sceneIndex={sceneIndex} />
            <SpriteList />
        </div>
        <div>
            <SpriteEditorToolbar />
            <SpriteEditorActionbar />
            <SpriteEditor spriteIndex={spriteIndex} />
        </div>
      </div>

      {/* <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <ReactJson src={JSON.parse(JSON.stringify(project))} />
      </div> */}
    </div>
  )
}

export default Project;
