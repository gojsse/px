import React, { useCallback, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { useSelector } from 'react-redux'

import { SCENE_TOOLS } from '@/App.constants'
import { getCurrentTool } from '@store/sceneEditor/sceneEditor.slice'
import Sprite from '@views/Project/Sprite/Sprite.component'

import styles from './SpriteList.module.scss'

const totalSprites = 128
const perPage = 32
const pages = new Array(totalSprites / perPage)
  .fill(null)
  .map((_, index) => index + 1)

const getPagedIndexes = (page = 1, perPage = 32) => {
  const spriteIndexes = new Array(perPage)
    .fill(null)
    .map((_, index) => page === 1 ? index : index + (page - 1) * perPage)
  return spriteIndexes
}

const buttonBase = 'relative inline-flex items-center -ml-px px-3 py-1 text-xs font-medium focus:z-10'
const defaultClass = buttonBase + ' bg-white text-gray-700 hover:bg-gray-50'
const selectedClass = buttonBase + ' bg-indigo-500 text-gray-50 hover:bg-indigo-500'

const SpriteList = (props) => {
  const history = useHistory()
  const { projectId, sceneIndex, spriteIndex } = useParams()

  // TODO left off here...is doing 0/32?
  const [currentPage, setCurrentPage] = useState(Math.ceil((parseInt(spriteIndex) + 1) / perPage))
  const currentPageStart = ((currentPage - 1) * perPage) + 1
  const currentPageEnd = currentPage * perPage

  console.log(Math.ceil((parseInt(spriteIndex) + 1) / perPage), currentPageStart, currentPageEnd)

  const selectedTool = useSelector(getCurrentTool)

  const handleClick = useCallback(
    (spriteIndex) => {
      history.push(`/projects/${projectId}/${sceneIndex}/${spriteIndex}`)
    }, [history, sceneIndex, projectId]
  )

  return (
    <div>
      <div className={styles.spriteList}>
        <div className={styles.spriteListRow}>
          {getPagedIndexes(currentPage, perPage).map((index) => (
            // <div>{index}</div>
            <Sprite
              key={index}
              spriteIndex={index}
              cursor='pointer'
              isSelected={parseInt(index) === parseInt(spriteIndex)}
              isDraggable={selectedTool === SCENE_TOOLS.MOVE}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
      <div className='flex items-center justify-between text-xs border-t border-gray-100 p-2'>
        <div>Sprites [{currentPageStart}-{currentPageEnd}]</div>
        <div className='divide-x divide-gray-200'>
          {pages.map((page) => {
            const buttonClass = page === currentPage ? selectedClass : defaultClass
            return (
              <button
                key={page}
                className={`${buttonClass}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default React.memo(SpriteList)
