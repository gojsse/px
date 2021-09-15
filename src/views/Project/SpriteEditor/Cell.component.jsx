import React from 'react';
import { useDispatch } from 'react-redux';

import { SPRITE_TOOLS } from '@/App.constants';
import { setSelectedColor } from '@store/spriteEditor/spriteEditor.slice';

const Cell = (props) => {
  const {
    rowIndex,
    colIndex,
    colorKey,
    selectedTool,
    mouseIsDown,
    clickHandler,
  } = props;

  const dispatch = useDispatch();

  const cellClickHandler = () => {
    if (selectedTool === SPRITE_TOOLS.COLOR_SAMPLE) {
      dispatch(setSelectedColor({color: colorKey}));
      return;
    }
    clickHandler(rowIndex, colIndex);
  }

  const mouseEnterHandler = () => {
    if (selectedTool === SPRITE_TOOLS.COLOR_SAMPLE && mouseIsDown) {
      dispatch(setSelectedColor({color: colorKey}));
      return;
    }
    if (mouseIsDown) {
      clickHandler(rowIndex, colIndex);
    }
  }

  return (
    <button
      className={`color color--${colorKey}`}
      onMouseDown={() => cellClickHandler()}
      onMouseEnter={() => mouseEnterHandler()}
    />
  );
}

export default React.memo(Cell);
