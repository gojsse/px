import React from 'react';
import { useSelector } from 'react-redux';

import { getSelectedTool } from '@store/spriteEditor/spriteEditor.slice';
import { parseString } from 'loader-utils';

const SpriteInfoBar = ({ spriteIndex }) => {
  const selectedTool = useSelector(getSelectedTool);

  const formattedIndex = () => {
    const numericValue = parseInt(spriteIndex) + 1;

    let value = numericValue;
    if (numericValue < 10) {
      value = '00' + parseString(numericValue);
    } else if (numericValue < 100) {
      value = '0' + parseString(numericValue);
    }

    return value;
  }

  return (
    <div className='flex content-center justify-between p-2 text-xs'>
      <span>[{formattedIndex()}/128]</span>
      <span>{selectedTool} tool</span>
    </div>
  );
}

export default SpriteInfoBar;
