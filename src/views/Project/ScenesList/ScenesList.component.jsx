import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getCurrentProjectId, getCurrentProjectScenes, getCurrentProjectSprites, getCurrentProjectPaletteClass } from '@store/currentProject/currentProject.slice'
import Scene from '@components/Scene/Scene.component'
import NewSceneButton from './NewSceneButton.component'

const ScenesList = (props) => {
  const projectId = useSelector(getCurrentProjectId)
  const scenes = useSelector(getCurrentProjectScenes)
  const sprites = useSelector(getCurrentProjectSprites)
  const paletteClass = useSelector(getCurrentProjectPaletteClass)

  return (
    <div className={paletteClass}>
      <div className='mb-4 flex flex-wrap'>
        {scenes.map((scene, index) => {
          return (
            <div key={index} className='w-1/3 border-2'>
              <NavLink
                exact
                to={`/project/${projectId}/${index}/0`}
                className='w-full h-full block'
              >
                <Scene scene={scene} sprites={sprites} />
              </NavLink>
            </div>
          )
        })}
      </div>
      <NewSceneButton projectId={projectId} />
    </div>
  )
}

export default ScenesList
