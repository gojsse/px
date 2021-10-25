import React from 'react'
import { useSelector } from 'react-redux'

import { getCurrentProjectPaletteClass } from '../../../store/currentProject/currentProject.slice'

import SpriteInfoBar from './SpriteInfoBar/SpriteInfoBar.component'
import SpriteEditorToolbar from './SpriteEditorToolbar/SpriteEditorToolbar.component'
import SpriteEditorActionbar from './SpriteEditorActionbar/SpriteEditorActionbar.component'
import ColorSelector from './ColorSelector/ColorSelector.component'
import Grid from './Grid.component'

const SpriteEditor = ({ spriteIndex }) => {
  const projectPaletteClass = useSelector(getCurrentProjectPaletteClass)

  return (
    <div className={`shadow flex flex-col bg-white ${projectPaletteClass}`}>
      <div className='shadow'>
        <SpriteInfoBar spriteIndex={spriteIndex} />
        <div className='bg-indigo-100 bg-stripes bg-stripes-white shadow-sm border-t border-gray-100'>
          <SpriteEditorToolbar />
          <SpriteEditorActionbar spriteIndex={spriteIndex} />
        </div>
      </div>
      <div className='shadow'>
        <Grid spriteIndex={spriteIndex} />
      </div>
      <div className='bg-indigo-100 bg-stripes bg-stripes-white p-1'></div>
      <ColorSelector />
    </div>
  )
}

export default React.memo(SpriteEditor)
