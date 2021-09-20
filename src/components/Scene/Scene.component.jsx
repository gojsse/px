import React from 'react'
import { useSelector } from 'react-redux'

import { getProjectPaletteClass, getProjectScene } from '@store/projects/projects.slice'
import Sprite from '@components/Sprite/Sprite.component'

import styles from './Scene.module.scss'

const Scene = ({ projectId, sceneIndex }) => {
  const paletteClass = useSelector(getProjectPaletteClass(projectId))
  const scene = useSelector(getProjectScene(projectId, sceneIndex))

  return (
    <div className={paletteClass + ' w-full'}>
      {scene.spriteSheet.map((row, rowIndex) => (
        <div key={`${rowIndex}`} className={styles.row}>
          {row.map((cell, cellIndex) => {
            if (cell === null) {
              return null
            }
            return <Sprite key={`${rowIndex}_${cellIndex}`} projectId={projectId} spriteIndex={cell.id} />
          })}
        </div>
      ))}
    </div>
  )
}

export default Scene
