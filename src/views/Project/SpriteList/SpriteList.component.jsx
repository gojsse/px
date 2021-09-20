import React from 'react'
import { useHistory, useParams } from 'react-router'
import { useSelector } from 'react-redux'

import { SCENE_TOOLS } from '@/App.constants'
import { getSelectedProjectSpritesPaged, getSelectedProjectPaletteClass } from '@store/currentProject/currentProject.slice'
import { getSelectedSpriteIndex } from '@store/spriteEditor/spriteEditor.slice'
import { getSelectedTool } from '@store/sceneEditor/sceneEditor.slice'
import Sprite from '@views/Project/Sprite/Sprite.component'

import styles from './SpriteList.module.scss'

const SpriteList = (props) => {
  const history = useHistory()
  const { projectId, sceneIndex } = useParams()

  const sprites = useSelector(getSelectedProjectSpritesPaged(1, 32))
  const paletteClass = useSelector(getSelectedProjectPaletteClass)
  const selectedSpriteIndex = useSelector(getSelectedSpriteIndex)
  const selectedTool = useSelector(getSelectedTool)
  // const [isMouseOver, setMouseIsOver] = useState(false)
  // const [isHoveringAwhile, setIsHoveringAwhile] = useState(false)

  // useEffect(() => {
  //   let timer
  //   if (isMouseOver) {
  //     timer = setTimeout(() => {
  //       // console.log('This will run after 1 second!')
  //       setIsHoveringAwhile(true)
  //     }, 1000)
  //   } else {
  //     clearTimeout(timer)
  //     setIsHoveringAwhile(false)
  //   }

  //   return () => clearTimeout(timer)
  // }, [isMouseOver])

  // const dragOverHandler = event => {
  //   setMouseIsOver(true)
  //   event.preventDefault()
  // }

  // const dragLeaveHandler = () => {
  //   setMouseIsOver(false)
  //   setIsHoveringAwhile(false)
  // }

  const handleClick = (spriteIndex) => {
    history.push(`/project/${projectId}/${sceneIndex}/${spriteIndex}`)
  }

  // TODO I guess we need to make 'cells' for this to drop things into?
  //   onDragLeave={dragLeaveHandler}
  //   onDragEnd={dragLeaveHandler}
  //   onMouseOut={dragLeaveHandler}

  // isHoveringAwhile ? 'border-dashed border-4 border-light-blue-500' : ''

  return (
    <div className={paletteClass}>
      <div className={styles.spriteList}>
        <div className={styles.spriteListRow}>
          {sprites.map((_, spriteIndex) => (
            <Sprite
              key={spriteIndex}
              spriteIndex={spriteIndex}
              cursor={'pointer'}
              isSelected={parseInt(spriteIndex) === parseInt(selectedSpriteIndex)}
              isDraggable={selectedTool === SCENE_TOOLS.MOVE}
              onClick={() => handleClick(spriteIndex)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SpriteList
