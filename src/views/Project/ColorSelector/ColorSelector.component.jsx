import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { COLOR_KEYS } from '@/App.constants';
import { getProjectPaletteClass } from '@store/currentProject/currentProject.slice';
import { getSelectedColor, setSelectedColor } from '@store/spriteEditor/spriteEditor.slice';

import styles from './ColorSelector.module.scss';

const colorCells = [ ...COLOR_KEYS ];

const SpriteEditor = (props) => {
  const dispatch = useDispatch();
  const paletteClass = useSelector(getProjectPaletteClass);
  const selectedColor = useSelector(getSelectedColor);

  const handleColorClick = colorKey => {
    dispatch(setSelectedColor({color: colorKey}));
  }

  return (
    <div className={paletteClass}>
      <div className="h-3/4 bg-white overflow-hidden shadow">
        <div className={styles.colorGrid}>
          {colorCells.map((key, index) => {
            return (
              <button
                key={index}
                className={`color color--${key}`}
                onClick={() => handleColorClick(key)}
              />
            )
          })}
        </div>
      </div>
      <div className={`flex items-center h-1/4 p-2 text-xs color color--${selectedColor}`}>Color: color--{selectedColor}</div>
    </div>
  );
}

export default SpriteEditor;
