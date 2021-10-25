import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { undoLastChange, redoLastChange } from '../../store/currentProject/currentProject.actions'
import { canUndoCurrentProject, canRedoCurrentProject } from '../../store/currentProject/currentProject.slice'

const UndoRedo = () => {
  const dispatch = useDispatch()
  const canUndo = useSelector(canUndoCurrentProject)
  const canRedo = useSelector(canRedoCurrentProject)

  const buttonClass = 'h-full px-5 y-3 border-b-4'
  const disabledClass = ' opacity-50 cursor-not-allowed'

  const undoClickHandler = () => {
    if (canUndo) {
      dispatch(undoLastChange())
    }
  }

  const redoClickHandler = () => {
    if (canRedo) {
      dispatch(redoLastChange())
    }
  }

  const keyPress = useCallback(
    (event) => {
      // REDO
      if (event.keyCode === 89) {
        if ((event.ctrlKey && event.shiftKey) || (event.metaKey && event.shiftKey)) {
          dispatch(redoLastChange())
          return
        }
      // UNDO
      } else if (event.keyCode === 90) {
        if (event.ctrlKey || event.metaKey) {
          dispatch(undoLastChange())
          return
        }
      }
    },
    [dispatch]
  )

  // Keypress listener
  useEffect(() => {
    document.addEventListener('keydown', keyPress, false)
    return () => {
      document.removeEventListener('keydown', keyPress, false)
    }
  }, [keyPress])

  return (
    <div className='flex items-center justify-center h-full divide-x divide-gray-200 border-l text-xs'>
      <button
        className={`${buttonClass} ${!canUndo ? disabledClass : ''}`}
        onClick={() => undoClickHandler()}
        disabled={!canUndo}
      >
        Undo
      </button>
      <button
        className={`${buttonClass} ${!canRedo ? disabledClass : ''}`}
        onClick={() => redoClickHandler()}
        disabled={!canRedo}
      >
        Redo
      </button>
    </div>
  )
}

export default UndoRedo
