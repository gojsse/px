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
        r: 0 //passedData.spriteRotation ?? 0,
      },
    }));// then update main project list

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
    
  }

  return (
    <div
      className=''
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
    >
      {sprite !== null && (
        // <Sprite spriteIndex={sprite.id} />
        <Sprite
          key={sprite.id}
          spriteIndex={sprite.id}
          isDraggable={isDraggable}
          // onClick={() => handleClick(sprite.id)}
          // onDoubleClick={() => handleDoubleClick(sprite.id)}
        />
      )}
    </div>
  );
}

export default React.memo(Cell);
