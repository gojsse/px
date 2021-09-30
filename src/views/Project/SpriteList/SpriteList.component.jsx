import React from 'react'
import { useHistory, useParams } from 'react-router'
import { useSelector } from 'react-redux'

import { SCENE_TOOLS } from '@/App.constants'
import { getCurrentProjectSpritesPaged } from '@store/currentProject/currentProject.slice'
import { getCurrentSpriteIndex } from '@store/spriteEditor/spriteEditor.slice'
import { getCurrentTool } from '@store/sceneEditor/sceneEditor.slice'
import Sprite from '@views/Project/Sprite/Sprite.component'

import styles from './SpriteList.module.scss'

const SpriteList = (props) => {
  const history = useHistory()
  const { projectId, sceneIndex } = useParams()

  const sprites = useSelector(getCurrentProjectSpritesPaged(1, 32))
  const selectedSpriteIndex = useSelector(getCurrentSpriteIndex)
  const selectedTool = useSelector(getCurrentTool)

  const handleClick = (spriteIndex) => {
    history.push(`/projects/${projectId}/${sceneIndex}/${spriteIndex}`)
  }

  return (
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
  )
}

export default SpriteList
