import React from 'react';

import Cell from './Cell.component';

import styles from './SceneEditor.module.css';

const Grid = ({ scene }) => {

  const rowsHtml = scene.spriteSheet
    .map((row, rowIndex) => (
      <div className={styles.sceneGridRow} key={rowIndex}>
        {row.map((cellValue, colIndex) => {

          return (
            <Cell
              key={`r${rowIndex}_c${colIndex}`}
              rowIndex={rowIndex}
              colIndex={colIndex}
              sprite={cellValue}
            />
          );
        })}
      </div>
    ));

  return (
    <div>
      {rowsHtml}
    </div>
  );
}

export default Grid;
