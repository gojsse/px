import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getCurrentProjectId, getCurrentProjectScenes, getCurrentProjectSprites } from '@store/currentProject/currentProject.slice'
import Cell from './Cell.component'
import Scene from '@components/Scene/Scene.component'
// import NewSceneButton from './NewSceneButton.component'

import styles from './ScenesList.module.scss'

const buttonBase = 'relative inline-flex -ml-px px-3 py-1 text-xs font-medium focus:z-10'
const defaultClass = buttonBase + ' bg-white text-gray-700 hover:bg-gray-50'
const selectedClass = buttonBase + ' bg-indigo-500 text-gray-50 hover:bg-indigo-500'

const ScenesList = ({ sceneIndex, spriteIndex }) => {
  const projectId = useSelector(getCurrentProjectId)
  const scenes = useSelector(getCurrentProjectScenes)
  const sprites = useSelector(getCurrentProjectSprites)

  const [gridSize, setGridSize] = useState(2)

  return (
    <div>
      <div className='flex items-center justify-between text-xs'>
        <div className='p-2'>Scenes</div>
        <div className='flex items-center justify-center h-full ml-2 divide-x divide-gray-200'>
          <span className='mr-2'>Grid</span>
          {[2, 3, 4, 8].map(size => {
            const sizeClass = styles[`grid${size}w`]
            const buttonClass = size === gridSize ? selectedClass : defaultClass
            return (
              <button
                key={size}
                className={`${buttonClass} ${sizeClass}`}
                onClick={() => setGridSize(size)
              }>
                {size}
              </button>
            )
          })}
        </div>
      </div>
      <div className={styles.grid + ' ' + styles[`grid${gridSize}w`] + ' border-t border-gray-100 p-1'}>
        {scenes.map((scene, index) => (
          <Cell key={index} isSelected={parseInt(index) === parseInt(sceneIndex)}>
            {parseInt(index) === parseInt(sceneIndex) ? (
              <Scene scene={scene} sprites={sprites} />
            ) : (
              <NavLink exact to={`/projects/${projectId}/${index}/${spriteIndex}`}>
                <Scene scene={scene} sprites={sprites} />
              </NavLink>
            )}
          </Cell>
        ))}
      </div>
      {/* <NewSceneButton projectId={projectId} /> */}
    </div>
  )
}

export default ScenesList
