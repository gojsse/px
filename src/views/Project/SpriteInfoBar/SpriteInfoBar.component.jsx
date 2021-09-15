import React from 'react';
import { useSelector } from 'react-redux';

// import { SCENE_TOOLS } from '@/App.constants';
import { getSelectedTool } from '@store/spriteEditor/spriteEditor.slice';

const SpriteInfoBar = ({ spriteIndex }) => {
  const selectedTool = useSelector(getSelectedTool);
  // const sceneName = useSelector(getSelectedSceneName);

  return (
    <div className='flex content-center justify-between p-2 text-xs'>
      <span>Sprite: [{spriteIndex + 1}/128]</span>
      <span>{selectedTool}</span>
    </div>
  );
}

export default SpriteInfoBar;
