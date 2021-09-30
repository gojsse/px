import React from 'react';
import { useSelector } from 'react-redux';

import { getCurrentTool } from '@store/sceneEditor/sceneEditor.slice';
import Cell from './Cell.component';

import styles from './SceneEditor.module.scss';

const Grid = ({ scene }) => {
  const selectedTool = useSelector(getCurrentTool);

  return (
    <div>
      {scene.spriteSheet.map((row, rowIndex) => (
        <div className={styles.sceneGridRow} key={rowIndex}>
          {row.map((cellValue, colIndex) => (
            <Cell
              key={colIndex}
              rowIndex={rowIndex}
              colIndex={colIndex}
              sprite={cellValue}
              selectedTool={selectedTool}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
