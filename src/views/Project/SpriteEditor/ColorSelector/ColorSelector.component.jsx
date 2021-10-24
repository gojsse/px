import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { COLOR_KEYS } from '@/App.constants'
import { getCurrentColor, setCurrentColor } from '@store/spriteEditor/spriteEditor.slice'
import { getCurrentProjectPalette } from '@store/currentProject/currentProject.slice'
import Cell from './Cell.component'
import InfoBar from './InfoBar.component'

import styles from './ColorSelector.module.scss'

const SpriteEditor = (props) => {
  const dispatch = useDispatch()
  const selectedColor = useSelector(getCurrentColor)
  const selectedPalette = useSelector(getCurrentProjectPalette)

  const handleColorClick = (colorKey) => {
    dispatch(setCurrentColor({ color: colorKey }))
  }

  return (
    <div className={'flex-1 flex flex-col'}>
      <div className='bg-white'>
        <div className={styles.grid}>
          {COLOR_KEYS.map((key, index) => {
            return (
              <Cell
                key={index}
                value={key}
                isSelected={key === selectedColor}
                onClick={handleColorClick}
              />
            )
          })}
        </div>
      </div>
      <InfoBar selectedColor={selectedColor} selectedPalette={selectedPalette} />
    </div>
  )
}

export default SpriteEditor
