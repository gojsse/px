import React from 'react'
import { useSelector } from 'react-redux'

import { getCurrentProjectScenesCount } from '@store/currentProject/currentProject.slice'
import { getCurrentTool, getCurrentSceneName } from '@store/sceneEditor/sceneEditor.slice'

const SceneInfoBar = ({ sceneIndex }) => {
  const selectedTool = useSelector(getCurrentTool);
  const sceneName = useSelector(getCurrentSceneName);
  const projectSceneCount = useSelector(getCurrentProjectScenesCount)

  return (
    <div className='flex content-center justify-between p-2 text-xs'>
      <span>Scene [{parseInt(sceneIndex) + 1}/{projectSceneCount}] {sceneName}</span>
      <span>{selectedTool} tool</span>
    </div>
  )
}

export default SceneInfoBar
