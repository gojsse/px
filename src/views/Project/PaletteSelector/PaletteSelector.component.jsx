import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSelectedPalette, selectProjectPalette } from '@store/currentProject/currentProject.slice';

// TODO this should be passed down via context so it is available to all where needed
import { paletteList } from '@/App.constants.js';

const PaletteSelector = (props) => {
  const dispatch = useDispatch();
  const selectedPallete = useSelector(getSelectedPalette);

  const handlePaletteClick = palette => {
      dispatch(selectProjectPalette({palette}));
  }

  return (
    <div className=''>
      Palette: {selectedPallete}
      <br />
      <br />
      {paletteList.map(palette => {
        return (
          <div key={palette}>
            <button onClick={() => handlePaletteClick(palette)}>
              {palette}
            </button>
          </div>
        )
      })}
    </div>
  );
}

export default PaletteSelector;
