import { useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { getCurrentProjectScene } from '@store/currentProject/currentProject.slice'
import { updateSceneCell } from '@store/currentProject/currentProject.actions'
import { getCurrentTool } from '@store/sceneEditor/sceneEditor.slice'
import { updateGrid } from '@store/sceneEditor/sceneEditor.actions'
import Cell from './Cell.component'
// import Overlay from '@components/Overlay/Overlay.component'

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
    <div
      className="w-full"
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      onMouseLeave={() => setMouseDown(false)}
    >
      <div className={'w-full bg-gray-100 bg-stripes bg-stripes-white'}>
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

      {/* <Overlay
        bgClass={'bg-indigo-700'}
        zIndex={'z-10'}
        isOpen={true}
        onClick={() => {console.log('hey')}}
      /> */}
    </div>
  )
}

export default SceneEditor
