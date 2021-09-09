import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { getProjectSpriteByIndex } from '@store/currentProject/currentProject.slice';

import styles from './Sprite.module.css';
import './SpriteTransform.css';

const Sprite = props => {
  const {
    spriteIndex,
    spriteRotation = 0,
    onClick = () => {},
    onDoubleClick = () => {},
    isDraggable = true,
  } = props;

  const sprite = useSelector(getProjectSpriteByIndex(spriteIndex));
  const [isDragging, setIsDragging] = useState(false);

  const dragStartHandler = event => {
    setIsDragging(true);

    const draggingData = {
      sprite,
      spritePoolIndex: spriteIndex
    }

    event.dataTransfer.setData('text/plain', JSON.stringify(draggingData));
  }

  const dragOverHandler = event => {
    event.preventDefault();
  }

  const dropHandler = event => {
    setIsDragging(false);
    event.preventDefault();
  }

  const dragEndHandler = () => {
    setIsDragging(false);
  }

  const spriteHtml = sprite
    .map((row, rowIndex) => (
      <div key={rowIndex} className={styles.spriteGridRow}>
        {row.map((cell, colIndex) => (
          <div key={colIndex} className={`color color--${cell}`} onClick={() => onClick(spriteIndex)} />
        ))}
      </div>
    ));

  const classList = [
    isDragging ? 'sprite sprite--dragging' : 'sprite',
    `sprite--r${spriteRotation}`,
  ].join(' ');

  return (
    <div
      className={styles.spriteGrid + ' ' + classList}
      draggable={isDraggable}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
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
