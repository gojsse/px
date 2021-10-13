import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getCurrentProjectScene } from '@store/currentProject/currentProject.slice'
// import Overlay from '@components/Overlay/Overlay.component'
import { updateScene } from '@store/currentProject/currentProject.actions'
import { getCurrentTool } from '@store/sceneEditor/sceneEditor.slice'
import Cell from './Cell.component'

import styles from './SceneEditor.module.scss'

const SceneEditor = ({ sceneIndex }) => {
  const dispatch = useDispatch()
  const selectedTool = useSelector(getCurrentTool)
  const projectScene = useSelector(getCurrentProjectScene(sceneIndex))

  const [mouseDown, setMouseDown] = useState(false)

  const handleChangeCell = (lastValue) => ({ row, column, value }) => {
    if (lastValue.id !== value.id) {
      dispatch(updateScene({ sceneIndex, row, column, value }))
    }
  }

  return (
    <div
      className='w-full'
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
                rowIndex={rowIndex}
                colIndex={colIndex}
                sprite={cellValue}
                selectedTool={selectedTool}
                mouseIsDown={mouseDown}
                onChange={handleChangeCell(cellValue)}
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
