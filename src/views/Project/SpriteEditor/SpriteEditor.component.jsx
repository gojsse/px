import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SPRITE_TOOLS } from '@/App.constants'
import { updateSprite } from '@store/spriteEditor/spriteEditor.actions'
import { useUpdateProjectMutation } from '@store/currentProject/currentProject.api'
import { getCurrentProjectSpriteByIndex, updateCurrentProjectSprite } from '@store/currentProject/currentProject.slice'
import { getCurrentSprite, setCurrentSprite, setCurrentSpriteIndex, getCurrentTool, getCurrentColor } from '@store/spriteEditor/spriteEditor.slice'
import Cell from './Cell.component'

import styles from './SpriteEditor.module.scss'

const SpriteEditor = ({ spriteIndex }) => {
  const dispatch = useDispatch()

  const projectSprite = useSelector(getCurrentProjectSpriteByIndex(spriteIndex))
  const selectedSprite = useSelector(getCurrentSprite)
  const selectedTool = useSelector(getCurrentTool)
  const selectedColor = useSelector(getCurrentColor)

  const [mouseDown, setMouseDown] = useState(false)
  const [labeledGrid, updateLabeledGrid] = useState([])

  const [
    updateProject, // This is the mutation trigger
    // { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useUpdateProjectMutation()

  const updateCellValues = (rowIndex, colIndex) => {
    const updatedGrid = selectedSprite.map(row => ([ ...row.map(cell => cell) ]))

    if (selectedTool === SPRITE_TOOLS.PENCIL) {
      updatedGrid[rowIndex][colIndex] = selectedColor
    } else if (selectedTool === SPRITE_TOOLS.FILL) {
      const cellLabelValue = labeledGrid[rowIndex][colIndex]
      labeledGrid.forEach((row, labeledRowIndex) => {
        row.forEach((colValue, labeledColIndex) => {                   
          if (colValue === cellLabelValue) {
            updatedGrid[labeledRowIndex][labeledColIndex] = selectedColor
          }
        })
      })
    } else if (selectedTool === SPRITE_TOOLS.ERASER) {
      updatedGrid[rowIndex][colIndex] = null
    } else {
      return
    }

    dispatch(updateSprite({ sprite: updatedGrid }))
      .then(({ projectId, updatedProject }) => {
        updateProject({ projectId, updatedProject })
      })
  }

  // todo move to helper file?
  const scanForGridRegions = useCallback(() => {
    const labeledGrid = []
    const groups = []

    // Label cells in preliminary groups
    selectedSprite.forEach((row, rowIndex) => {
      labeledGrid[rowIndex] = []

      row.forEach((colValue, colIndex) => {
        const westValue = colIndex > 0 ? selectedSprite[rowIndex][colIndex - 1] : -1
        const northValue = rowIndex > 0 ? selectedSprite[rowIndex - 1][colIndex] : -1
        const westLabel = colIndex > 0 ? labeledGrid[rowIndex][colIndex - 1] : -1
        const northLabel = rowIndex > 0 ? labeledGrid[rowIndex - 1][colIndex] : -1

        if (colValue === westValue) {
          if (colValue === northValue && westLabel !== northLabel) {
            const min = Math.min(westLabel, northLabel)
            const max = Math.max(westLabel, northLabel)
            const lowestMatchedIndex = groups.findIndex(subSet => subSet.has(min))
            groups[lowestMatchedIndex].add(max)
            groups[max] = groups[lowestMatchedIndex]
            labeledGrid[rowIndex][colIndex] = min
          } else {
            labeledGrid[rowIndex][colIndex] = westLabel
          }
        }

        if (colValue !== westValue) {
          if (colValue === northValue) {
            labeledGrid[rowIndex][colIndex] = northLabel
          } else {
            const newGroup = new Set()
            newGroup.add(groups.length)
            groups.push(newGroup)
            labeledGrid[rowIndex][colIndex] = groups.length - 1
          }
        }
      })
    })

    // Group equivalents
    const processedLabeledGrid = labeledGrid.map(row => {
      return row.map(colValue => {
        const setArray = []
        groups[colValue].forEach(value => {
          setArray.push(value)
        })
        const minValue = Math.min(...setArray)
        return minValue
      })
    })

    updateLabeledGrid(processedLabeledGrid)
  }, [selectedSprite])

  useEffect(() => {
    dispatch(setCurrentSprite({ sprite: projectSprite }))
    dispatch(setCurrentSpriteIndex({ spriteIndex }))
  }, [dispatch, projectSprite, spriteIndex])

  useEffect(() => {
    scanForGridRegions()
  }, [scanForGridRegions, selectedSprite])

  const Cells = selectedSprite
    .map((row, rowIndex) => {
      return (
        <div className={styles.spriteGridRow} key={rowIndex}>
          {row.map((cellValue, colIndex) => {
            return (
              <Cell
                key={`r${rowIndex}-c${colIndex}`}
                rowIndex={rowIndex}
                colIndex={colIndex}
                colorKey={cellValue}
                selectedColorKey={selectedColor}
                selectedTool={selectedTool}
                mouseIsDown={mouseDown}
                clickHandler={updateCellValues} 
              />
            )
          })}
        </div>
      )
    })

  const handleMouseLeave = () => {
    if (mouseDown) {
      dispatch(updateCurrentProjectSprite({index: spriteIndex, sprite: selectedSprite}))
    }
    setMouseDown(false)
  }

  return (
    <div className={'mb-2'}>
      <div
        className={styles.spriteGrid}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => {
          setMouseDown(false)
          dispatch(updateCurrentProjectSprite({index: spriteIndex, sprite: selectedSprite}))
        }}
      >
        {Cells}
      </div>
    </div>
  )
}

export default React.memo(SpriteEditor)
