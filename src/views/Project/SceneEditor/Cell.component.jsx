import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSelectedSceneCell } from '@store/sceneEditor/sceneEditor.slice';

import Sprite from '@views/Project/Sprite/Sprite.component';

const Cell = ({ sprite, rowIndex, colIndex }) => {
  const dispatch = useDispatch();
  const [isDraggable, setIsDraggable] = useState(true);

  const dragOverHandler = event => {
    event.preventDefault();
  }

  const dropHandler = event => {
    event.preventDefault(); 

    const passedData = JSON.parse(event.dataTransfer.getData('text'));

    dispatch(updateSelectedSceneCell({
      row: rowIndex,
      column: colIndex,
      value: {
        id: passedData.spritePoolIndex,
        r: passedData.spriteRotation ?? 0,
      },
    }));// then update main project list? use action thunk

    // Remove sprite from grid if dropped outside of grid
    // if (passedData.spriteGridRow && passedData.spriteGridColumn) {
    //   if (rowIndex != passedData.spriteGridRow || colIndex != passedData.spriteGridColumn) {
    //     updatedScene.spriteSheet[passedData.spriteGridRow][passedData.spriteGridColumn] = null;
    //   }
    // }

    // setSelectedScene(updatedScene);
    // setShowDeleteZone(false);
    event.dataTransfer.clearData();
  }

  const handleDoubleClick = (spriteIndex) => {
    // TODO removed rotation, it was buggy. update spriteSheet to be simple array of index values vs objects
    // dispatch(updateSelectedSceneCell({
    //   row: rowIndex,
    //   column: colIndex,
    //   value: {
    //     id: sprite.id,
    //     r: sprite.r === 3 ? 0 : sprite.r + 1,
    //   },
    // }));
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
          spriteRotation={sprite.r}
          isDraggable={isDraggable}
          // onClick={() => handleClick(sprite.id)}
          onDoubleClick={() => handleDoubleClick(sprite.id)}
        />
      )}
    </div>
  );
}

export default React.memo(Cell);
