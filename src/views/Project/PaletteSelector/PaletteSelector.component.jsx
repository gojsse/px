import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSelectedPalette, selectProjectPalette } from '@store/currentProject/currentProject.slice';

import { PALETTE_LIST, COLOR_KEYS } from '@/App.constants.js';

const PaletteSelector = (props) => {
  const dispatch = useDispatch();
  const selectedPallete = useSelector(getSelectedPalette);

  const handlePaletteClick = palette => {
    dispatch(selectProjectPalette({palette}));
  }

  return (
    <div className='palette-preview'>
      <div className='flex content-center justify-between p-2 text-xs'>Palette: {selectedPallete}</div>
      <div className='p-2 grid grid-cols-8 gap-2'>
        {PALETTE_LIST.map(palette => {
          return (
            <div key={palette} className={`palette palette--${palette}`}>
              <button onClick={() => handlePaletteClick(palette)} className='grid grid-cols-4 gap-0 w-full'>
                {COLOR_KEYS.map(color => {
                  return (
                    <div className={`color color--${color}`}></div>
                  )
                })}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default PaletteSelector;
