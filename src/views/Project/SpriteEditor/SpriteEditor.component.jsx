import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { spriteTools } from '@/App.constants';
import { getProjectSpriteByIndex, updateProjectSprite, getProjectPaletteClass } from '@store/currentProject/currentProject.slice';
import { getSelectedSprite, setSelectedSprite, getSelectedTool, getSelectedColor } from '@store/spriteEditor/spriteEditor.slice';
import ColorSelector from '@views/Project/ColorSelector/ColorSelector.component';
import Cell from './Cell.component';

import styles from './SpriteEditor.module.css';

const SpriteEditor = ({ spriteIndex }) => {
  const dispatch = useDispatch();
  const projectSprite = useSelector(getProjectSpriteByIndex(spriteIndex));
  const selectedSprite = useSelector(getSelectedSprite);
  const selectedTool = useSelector(getSelectedTool);
  const selectedColor = useSelector(getSelectedColor);
  const paletteClass = useSelector(getProjectPaletteClass);

  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    dispatch(setSelectedSprite({ sprite: projectSprite }));
  }, [dispatch, projectSprite]);

  const updateCellValues = (rowIndex, colIndex) => {
    const updatedGrid = selectedSprite.map(row => ([ ...row.map(cell => cell) ]));

    if (selectedTool === spriteTools.PENCIL) {
      updatedGrid[rowIndex][colIndex] = selectedColor;
    } else if (selectedTool === spriteTools.FILL) {
      // const cellLabelValue = labeledGrid[rowIndex][colIndex];
      // labeledGrid.forEach((row, labeledRowIndex) => {
      //     row.forEach((colValue, labeledColIndex) => {                   
      //         if (colValue === cellLabelValue) {
      //             updatedGrid[labeledRowIndex][labeledColIndex] = cellValue;
      //         }
      //     });
      // })
    } else if (selectedTool === spriteTools.ERASER) {
    //   updatedGrid[rowIndex][colIndex] = null;
    } else {
      return;
    }

    dispatch(setSelectedSprite({ sprite: updatedGrid }));
  }
  
  const Cells = selectedSprite
    .map((row, rowIndex) => {
      return (
        <div className={styles.spriteGridRow} key={rowIndex}>
          {row.map((cellValue, colIndex) => {
            return (
              <Cell
                key={`r${rowIndex}-c${colIndex}`}
                rowIndex={rowIndex}
                colIndex={colIndex}
                colorKey={cellValue}
                selectedColorKey={selectedColor}
                selectedTool={selectedTool}
                mouseIsDown={mouseDown}
                clickHandler={updateCellValues} 
              />
            );
          })}
        </div>
      );
    });

  return (
    <div>
      <div className="bg-white overflow-hidden shadow">
        <div className={paletteClass}>
          <div
            className={styles.spriteGrid}
            onMouseLeave={() => setMouseDown(false)}
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={() => {
              setMouseDown(false);
              dispatch(updateProjectSprite({index: spriteIndex, sprite: selectedSprite}))
            }}
          >
            {Cells}
          </div>
        </div>
        <ColorSelector />
      </div>
    </div>
  );
}

export default React.memo(SpriteEditor);
