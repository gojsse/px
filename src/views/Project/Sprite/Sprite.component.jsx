import React from 'react';
import { useSelector } from 'react-redux';

import { getProjectSpriteByIndex } from '@store/currentProject/currentProject.slice';

import styles from './Sprite.module.css';

const Sprite = ({ spriteIndex, onClick = () => {} }) => {
  const sprite = useSelector(getProjectSpriteByIndex(spriteIndex));

  const spriteHtml = sprite
    .map((row, rowIndex) => (
        <div key={rowIndex} className={styles.spriteGridRow}>
          {row.map((cell, colIndex) => (
            <div key={colIndex} className={`color color--${cell}`} onClick={() => onClick(spriteIndex)} />
          ))}
        </div>
    ));

  return (
    <div className={styles.spriteGrid}>
      {spriteHtml}
    </div>
  );
}

export default React.memo(Sprite);
