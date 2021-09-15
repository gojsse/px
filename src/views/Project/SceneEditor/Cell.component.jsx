import React from 'react';
import { useDispatch } from 'react-redux';

import { SCENE_TOOLS } from '@/App.constants';
import { updateScene } from '@store/actions';

import Sprite from '@views/Project/Sprite/Sprite.component';

const Cell = (props) => {
  const {
    sprite,
    rowIndex,
    colIndex,
    selectedTool,
  } = props;

  const dispatch = useDispatch();

  const dragOverHandler = event => {
    event.preventDefault();
  }

  const dropHandler = event => {
    event.preventDefault(); 
    const passedData = JSON.parse(event.dataTransfer.getData('text'));

    dispatch(updateScene({
      row: rowIndex,
      column: colIndex,
      value: {id: passedData.spritePoolIndex},
    }));

    // Remove sprite from grid
    if (passedData?.rowIndex && passedData?.colIndex) {
      if (rowIndex !== passedData.rowIndex || colIndex !== passedData.colIndex) {
        dispatch(updateScene({
          row: passedData.rowIndex,
          column: passedData.colIndex,
          value: null,
        }));
      }
    }

    // TODO Remove sprite from grid if dropped outside of grid
    // setShowDeleteZone(false);
    event.dataTransfer.clearData();
  }

  return (
    <div
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
    >
      {sprite !== null && (
        <Sprite
          key={sprite.id}
          spriteIndex={sprite.id}
          rowIndex={rowIndex}
          colIndex={colIndex}
          isDraggable={selectedTool === SCENE_TOOLS.MOVE}
        />
      )}
    </div>
  );
}

export default React.memo(Cell);
