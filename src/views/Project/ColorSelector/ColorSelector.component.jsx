import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { COLOR_KEYS } from '@/App.constants';
import { getProjectPaletteClass } from '@store/currentProject/currentProject.slice';
import { getSelectedColor, setSelectedColor } from '@store/spriteEditor/spriteEditor.slice';
import Cell from './Cell.component';
import InfoBar from './InfoBar.component';

import styles from './ColorSelector.module.scss';

const SpriteEditor = (props) => {
  const dispatch = useDispatch();
  const paletteClass = useSelector(getProjectPaletteClass);
  const selectedColor = useSelector(getSelectedColor);

  const handleColorClick = (colorKey) => {
    dispatch(setSelectedColor({color: colorKey}));
  }

  return (
    <div className={paletteClass + ' flex-1 flex flex-col'}>
      <div className='bg-white'>
        <div className={styles.colorGrid}>
          {COLOR_KEYS.map((key, index) => {
            return (
              <Cell
                key={index}
                value={key}
                paletteClass={paletteClass}
                isSelected={key === selectedColor}
                onClick={handleColorClick}
              />
            )
          })}
        </div>
      </div>
      <InfoBar selectedColor={selectedColor} paletteClass={paletteClass} />
    </div>
  );
}

export default SpriteEditor;
