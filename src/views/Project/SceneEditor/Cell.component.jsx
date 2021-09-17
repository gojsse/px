import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SCENE_TOOLS } from '@/App.constants';
import { updateScene } from '@store/actions';
import { getSelectedSpriteIndex } from '@store/spriteEditor/spriteEditor.slice';
import Sprite from '@views/Project/Sprite/Sprite.component';

const Cell = (props) => {
  const {
    sprite,
    rowIndex,
    colIndex,
    selectedTool,
  } = props;

  const dispatch = useDispatch();

  // TODO get selected spriteIndex from sprite list
  const selectedSpriteIndex = useSelector(getSelectedSpriteIndex);

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

  const cellClickHandler = () => {
    if (selectedTool === SCENE_TOOLS.STAMP) {
      dispatch(updateScene({
        row: rowIndex,
        column: colIndex,
        value: {id: selectedSpriteIndex},
      }));
    }
  }

  const cursor = () => {
    let cursorType = 'default';
    if (selectedTool === SCENE_TOOLS.MOVE) {
      cursorType = 'grab';
    } else if (selectedTool === SCENE_TOOLS.STAMP) {
      cursorType = 'cell';
    }
    return cursorType;
  }

  return (
    <div
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
      onMouseDown={cellClickHandler}
    >
      {sprite !== null && (
        <Sprite
          key={sprite.id}
          spriteIndex={sprite.id}
          rowIndex={rowIndex}
          colIndex={colIndex}
          cursor={cursor()}
          isDraggable={selectedTool === SCENE_TOOLS.MOVE}
        />
      )}
    </div>
  );
}

export default React.memo(Cell);
