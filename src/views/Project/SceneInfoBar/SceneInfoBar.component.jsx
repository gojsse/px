import React from 'react';
import { useSelector } from 'react-redux';

// import { SCENE_TOOLS } from '@/App.constants';
import { getSelectedTool, getSelectedSceneName } from '@store/sceneEditor/sceneEditor.slice';

const SceneInfoBar = ({ sceneIndex }) => {
  const selectedTool = useSelector(getSelectedTool);
  const sceneName = useSelector(getSelectedSceneName);

  return (
    <div className='flex content-center justify-between p-2 text-xs'>
      <span>{sceneName} [{sceneIndex}/?]</span>
      <span>{selectedTool}</span>
    </div>
  );
}

export default SceneInfoBar;
