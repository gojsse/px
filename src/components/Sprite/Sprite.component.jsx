import React from 'react';

import { EMPTY_SPRITE } from '@/App.constants'

import styles from './Sprite.module.scss';

const Sprite = ({ sprite }) => {

  if (sprite === null) {
    sprite = [ ...EMPTY_SPRITE ]
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
  );
}

export default React.memo(Sprite);
