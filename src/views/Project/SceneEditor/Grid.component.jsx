import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateScene } from '@store/sceneEditor/sceneEditor.actions'
import { getCurrentTool } from '@store/sceneEditor/sceneEditor.slice';
import { useUpdateProjectMutation } from '@store/currentProject/currentProject.api'
import Cell from './Cell.component';

import styles from './SceneEditor.module.scss';

const Grid = ({ scene }) => {
  const dispatch = useDispatch()
  const selectedTool = useSelector(getCurrentTool);

  const [ updateProject ] = useUpdateProjectMutation()

  const handleDrop = ({ row, column, value }) => {
    dispatch(updateScene({ row, column, value }))
      .then(({ projectId, updatedProject }) => {
        updateProject({ projectId, updatedProject })
      })
  }

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
              onDrop={handleDrop}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
