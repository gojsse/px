import React from 'react'

import Sprite from '@components/Sprite/Sprite.component'

import styles from './Scene.module.scss'

const Scene = ({ scene, sprites }) => {

  return (
    <div className='w-full'>
      {scene.spriteSheet.map((row, rowIndex) => (
        <div key={`${rowIndex}`} className={styles.row}>
          {row.map((cell, cellIndex) => {
            const sprite = cell === null ? null : sprites[cell.id]
            return <Sprite key={`${rowIndex}_${cellIndex}`} sprite={sprite} />
          })}
        </div>
      ))}
    </div>
  )
}

export default React.memo(Scene)
