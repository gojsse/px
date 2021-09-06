import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { colorKeys } from '@/App.constants';
import { getProjectPaletteClass } from '@store/currentProject/currentProject.slice';
import { getSelectedColor, setSelectedColor } from '@store/spriteEditor/spriteEditor.slice';

import styles from './ColorSelector.module.css';

const colorCells = [ ...colorKeys ];

const SpriteEditor = (props) => {
  const dispatch = useDispatch();
  const paletteClass = useSelector(getProjectPaletteClass);
  const selectedColor = useSelector(getSelectedColor);

  const handleColorClick = colorKey => {
    dispatch(setSelectedColor({color: colorKey}));
  }

  return (
    <div className={paletteClass}>
      <div className="bg-white overflow-hidden shadow mt-2">
        <div className={styles.colorGrid}>
          {colorCells.map((key, index) => {
            return (
              <button
                key={index}
                className={`color--${key}`}
                onClick={() => handleColorClick(key)}
              />
            )
          })}
        </div>
      </div>
      <div className={`p-2 color--${selectedColor}`}>Color: color--{selectedColor}</div>
    </div>
  );
}

export default SpriteEditor;
