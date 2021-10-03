import React from 'react'
import { useSelector } from 'react-redux'

import { getCurrentProjectSpriteByIndex } from '@store/currentProject/currentProject.slice'

import styles from './Sprite.module.scss'

const Sprite = props => {
  const {
    spriteIndex,
    isSelected = false,
    isDraggable = true,
    onClick = () => {},
    cursor = 'default',
    rowIndex,
    colIndex,
  } = props

  const sprite = useSelector(getCurrentProjectSpriteByIndex(spriteIndex))

  const dragStartHandler = event => {
    const draggingData = {
      rowIndex,
      colIndex,
      sprite,
      spritePoolIndex: spriteIndex
    }
    event.dataTransfer.setData('text/plain', JSON.stringify(draggingData))
  }

  const dragOverHandler = event => {
    event.preventDefault()
  }

  const dropHandler = event => {
    event.preventDefault()
  }

  return (
    <div
      className={styles.sprite + (isSelected ? ' ' + styles.spriteSelected : '')}
      style={{ cursor: cursor }}
      draggable={isDraggable}
      onDragStart={dragStartHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
      onClick={onClick}
    >
      {sprite.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.spriteRow}>
          {row.map((cell, colIndex) => (
            <div key={colIndex} className={`color color--${cell}`} onClick={() => onClick(spriteIndex)} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default React.memo(Sprite)
