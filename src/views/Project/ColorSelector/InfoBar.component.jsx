import React, { useEffect, useRef, useState } from 'react';
import chroma from 'chroma-js';

import { ColorSwatchIcon } from '@heroicons/react/outline';

const InfoBar = ({ selectedColor, paletteClass }) => {
  const cellRef = useRef(null);
  const [colorHex, setColorHex] = useState('');
  const [colorRgb, setColorRgb] = useState('');
  const [isDarkColor, setIsDarkColor] = useState(false);

  useEffect(() => {
    const style = window.getComputedStyle(cellRef.current);
    const rgbColor = style.backgroundColor;
    const hex = chroma(rgbColor).hex();
    const rgb = chroma(rgbColor).css();
    const lum = chroma(rgbColor).luminance();

    setColorHex(hex);
    setColorRgb(rgb);
    setIsDarkColor(lum < .45);
  }, [selectedColor, paletteClass]);

  const textColorClass = isDarkColor ? 'text-white' : 'text-black';

  return (
    <div
      className={`flex flex-1 items-start h-1/4 p-2 text-xs font-mono color color--${selectedColor} ${textColorClass}`}
      ref={cellRef}
    >
      <ColorSwatchIcon className='block h-5 w-5 mr-2' /> c{selectedColor} | {colorHex} | {colorRgb}
    </div>
  );
}

export default InfoBar;
