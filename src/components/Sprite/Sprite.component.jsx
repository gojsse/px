import React from 'react'
import { useSelector } from 'react-redux'

import { EMPTY_SPRITE } from '@/App.constants'
import { getCurrentProjectSpriteByIndex } from '@store/currentProject/currentProject.slice'

import styles from './Sprite.module.scss'

const Sprite = ({
  sprite,
  spriteIndex
}) => {
  const spriteByIndex = useSelector(getCurrentProjectSpriteByIndex(spriteIndex))

  if (sprite === null) {
    sprite = [ ...EMPTY_SPRITE ]
  }

  if (spriteByIndex !== undefined) {
    sprite = spriteByIndex
  }

  return (
    <div>
      {sprite.map((row, rowIndex) => (
        <div key={`${rowIndex}`} className={styles.row}>
          {row.map((cell, cellIndex) => (
            <div key={`${rowIndex}_${cellIndex}`} className={`color color--${cell ?? 'none'}`} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default React.memo(Sprite)
