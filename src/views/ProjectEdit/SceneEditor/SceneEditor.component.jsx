import { useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { SCENE_TOOLS } from '@/App.constants'
import { getCurrentProjectScene } from '@store/currentProject/currentProject.slice'
import { updateSceneCell } from '@store/currentProject/currentProject.actions'
import { getCurrentTool } from '@store/sceneEditor/sceneEditor.slice'
import { updateGrid } from '@store/sceneEditor/sceneEditor.actions'
import Cell from './Cell.component'
import DropDeleteZone from './DropDeleteZone.component'
import HelpBox from '@components/HelpBox/HelpBox.component'

import styles from './SceneEditor.module.scss'

const SceneEditor = ({ sceneIndex }) => {
  const dispatch = useDispatch()
  const selectedTool = useSelector(getCurrentTool)
  const projectScene = useSelector(getCurrentProjectScene(sceneIndex))
  const { spriteIndex } = useParams()

  const [mouseDown, setMouseDown] = useState(false)

  const handleDrop = (lastValue) => ({ row, column, value }) => {
    if (lastValue !== value) {
      dispatch(updateSceneCell({ sceneIndex, row, column, value }))
    }
    setMouseDown(false)
  }

  const handleRemove = ({ row, column }) => {
    dispatch(updateSceneCell({ sceneIndex, row, column, value: null }))
  }

  const handleCellClick = ({ row, column }) => {
    dispatch(updateGrid({
      grid: projectScene.spriteSheet,
      sceneIndex,
      spriteIndex,
      row,
      column
    }))
  }

  return (
    <div className={'w-full relative'}>
      <DropDeleteZone
        sceneIndex={sceneIndex}
        mouseDown={mouseDown && selectedTool === SCENE_TOOLS.MOVE}
        setMouseDown={setMouseDown}
      />

      <HelpBox
        isShowing={mouseDown && selectedTool === SCENE_TOOLS.MOVE }
        zIndex={'z-21'}
        bgClass={'bg-gray-800'}
        textClass={'text-white'}
      >
        Drag a sprite to move it. Drag it outside of the grid to delete it.
      </HelpBox>

      <div
        className={'relative w-full bg-gray-200 bg-stripes bg-stripes-white' + (mouseDown ? ' z-21' : '')}
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
        onMouseLeave={() => setMouseDown(false)}
      >
        {projectScene.spriteSheet.map((row, rowIndex) => (
          <div className={styles.sceneGridRow} key={rowIndex}>
            {row.map((cellValue, colIndex) => (
              <Cell
                key={colIndex}
                row={rowIndex}
                column={colIndex}
                spriteIndex={cellValue}
                selectedTool={selectedTool}
                mouseIsDown={mouseDown}
                onClick={handleCellClick}
                onDrop={handleDrop(cellValue)}
                onRemove={handleRemove}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SceneEditor
