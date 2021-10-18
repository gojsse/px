import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { scanForGridRegions } from '../../../data/data.helpers'
import { updateGrid } from '@store/spriteEditor/spriteEditor.actions'
import { getCurrentProjectSpriteByIndex } from '@store/currentProject/currentProject.slice'
import { getCurrentTool, getCurrentColor } from '@store/spriteEditor/spriteEditor.slice'
import Cell from './Cell.component'

import styles from './SpriteEditor.module.scss'

const SpriteEditor = ({ spriteIndex }) => {
  const dispatch = useDispatch()
  const selectedSprite = useSelector(getCurrentProjectSpriteByIndex(spriteIndex))
  const selectedTool = useSelector(getCurrentTool)
  const selectedColor = useSelector(getCurrentColor)

  const [mouseDown, setMouseDown] = useState(false)
  const [labeledGrid, updateLabeledGrid] = useState([])

  const cellClickHandler = ({ row, column }) => {
    dispatch(updateGrid({
      grid: selectedSprite,
      labeledGrid,
      spriteIndex,
      row,
      column
    }))
  }

  useEffect(() => {
    const processedGrid = scanForGridRegions(selectedSprite)
    updateLabeledGrid(processedGrid)
  }, [selectedSprite])

  return (
    <div
      className={styles.spriteGrid}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      onMouseLeave={() => setMouseDown(false)}
    >
      {selectedSprite.map((row, rowIndex) => (
        <div className={styles.spriteGridRow} key={rowIndex}>
          {row.map((cellValue, colIndex) => {
            return (
              <Cell
                key={`r${rowIndex}-c${colIndex}`}
                row={rowIndex}
                column={colIndex}
                colorKey={cellValue}
                selectedColorKey={selectedColor}
                selectedTool={selectedTool}
                mouseIsDown={mouseDown}
                clickHandler={cellClickHandler}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default React.memo(SpriteEditor)
