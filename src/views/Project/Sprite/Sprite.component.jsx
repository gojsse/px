import React from 'react';
import { useSelector } from 'react-redux';

import { getProjectSpriteByIndex } from '@store/currentProject/currentProject.slice';

import styles from './Sprite.module.scss';

const Sprite = props => {
  const {
    spriteIndex,
    onClick = () => {},
    onDoubleClick = () => {},
    isDraggable = true,
    rowIndex,
    colIndex,
  } = props;

  const sprite = useSelector(getProjectSpriteByIndex(spriteIndex));

  const dragStartHandler = event => {
    const draggingData = {
      rowIndex,
      colIndex,
      sprite,
      spritePoolIndex: spriteIndex
    }
    event.dataTransfer.setData('text/plain', JSON.stringify(draggingData));
  }

  const dragOverHandler = event => {
    event.preventDefault();
  }

  const dropHandler = event => {
    event.preventDefault();
  }

  const spriteHtml = sprite
    .map((row, rowIndex) => (
      <div key={rowIndex} className={styles.spriteGridRow}>
        {row.map((cell, colIndex) => (
          <div key={colIndex} className={`color color--${cell}`} onClick={() => onClick(spriteIndex)} />
        ))}
      </div>
    ));

  return (
    <div
      className={styles.spriteGrid}
      draggable={isDraggable}
      onDragStart={dragStartHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
      onDoubleClick={onDoubleClick}
      onClick={onClick}
    >
      {spriteHtml}
    </div>
  );
}

export default React.memo(Sprite);
