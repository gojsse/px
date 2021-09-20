import React from 'react';
import { useSelector } from 'react-redux';

import { getProjectSprite } from '@store/projects/projects.slice';

import styles from './Sprite.module.scss';

const Sprite = ({ projectId, spriteIndex }) => {
  const sprite = useSelector(getProjectSprite(projectId, spriteIndex));

  return (
    <div>
      {sprite.map((row, rowIndex) => (
        <div key={`${rowIndex}`} className={styles.row}>
          {row.map((cell, cellIndex) => (
            <div key={`${rowIndex}_${cellIndex}`} className={`color color--${cell}`} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Sprite;
