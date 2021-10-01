import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PALETTE_LIST, COLOR_KEYS } from '@/App.constants.js'
import { updatePalette } from '@store/currentProject/currentProject.actions'
import { getCurrentProjectPalette } from '@store/currentProject/currentProject.slice'
import { useUpdateProjectMutation } from '@store/currentProject/currentProject.api'
import Cell from './Cell.component'

import styles from './PaletteSelector.module.scss'

const PaletteSelector = (props) => {
  const dispatch = useDispatch()
  const selectedPalette = useSelector(getCurrentProjectPalette)
  const [ updateProject ] = useUpdateProjectMutation()

  const handlePaletteClick = palette => {
    dispatch(updatePalette({ palette }))
      .then(({ projectId, updatedProject }) => {
        updateProject({ projectId, updatedProject })
      })
  }

  return (
    <div className='palette-preview'>
      <div className='flex content-center justify-between p-2 text-xs'>Palette: {selectedPalette}</div>
      <div className={styles.grid + ' border-t border-gray-100 p-1'}>
        {PALETTE_LIST.map(palette => {
          return (
            <Cell key={palette} value={palette} isSelected={palette === selectedPalette} onClick={handlePaletteClick} >
              <div className={`grid grid-cols-4 gap-0 w-full palette palette--${palette}`}>
                {COLOR_KEYS.map(color => {
                  return (
                    <div key={color} className={`color color--${color}`} />
                  )
                })}
              </div>
            </Cell>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(PaletteSelector)
