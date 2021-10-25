import { useDispatch } from 'react-redux'

import { updateSceneCell } from '@store/currentProject/currentProject.actions'
import Overlay from '@components/Overlay/Overlay.component'

const DropDeleteZone = ({ sceneIndex, mouseDown, setMouseDown }) => {
  const dispatch = useDispatch()
  

  const dragOverHandler = event => {
    event.preventDefault()
  }

  const dropHandler = event => {
    event.preventDefault() 

    const passedData = JSON.parse(event.dataTransfer.getData('text'))
    const hasValidRow = passedData.rowIndex !== null && passedData.rowIndex >= 0
    const hasValidColumn = passedData.colIndex !== null && passedData.colIndex >= 0

    // Remove sprite from grid
    if (hasValidRow && hasValidColumn) {
      dispatch(updateSceneCell({
        sceneIndex,
        row: passedData.rowIndex,
        column: passedData.colIndex,
        value: null
      }))
    }

    setMouseDown(false)
    event.dataTransfer.clearData()
  }

  return (
    <Overlay
      isOpen={mouseDown}
      zIndex={'z-20'}
      bgClass={'bg-red-100 bg-stripes bg-stripes-white'}
    >
      <div
        className='h-full w-full'
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
      />
    </Overlay>
  )
}

export default DropDeleteZone
