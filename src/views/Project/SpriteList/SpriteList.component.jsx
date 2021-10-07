import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { DocumentDuplicateIcon } from '@heroicons/react/outline'

import { SCENE_TOOLS } from '@/App.constants'
import { useUpdateProjectMutation } from '@store/currentProject/currentProject.api'
import { getCurrentProjectPaletteClass } from '@store/currentProject/currentProject.slice'
import { copyAndPasteSprite } from '@store/currentProject/currentProject.actions'
import { getCurrentTool } from '@store/sceneEditor/sceneEditor.slice'
import Sprite from '@views/Project/Sprite/Sprite.component'
import Modal from '@components/Modal/Modal.component'
import Overlay from '@components/Overlay/Overlay.component'
import HelpBox from '@components/HelpBox/HelpBox.component'
import SpritePreview from '@components/Sprite/Sprite.component'

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

const buttonBase = 'relative inline-flex items-center -ml-px px-3 py-2 text-xs font-medium focus:z-16'
const defaultClass = buttonBase + ' bg-white text-gray-700 hover:bg-gray-50'
const selectedClass = buttonBase + ' bg-indigo-500 text-gray-50 hover:bg-indigo-500'

const SpriteList = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [ updateProject ] = useUpdateProjectMutation()

  const { projectId, sceneIndex, spriteIndex } = useParams()
  const [cloneSpriteMode, setCloneSpriteMode] = useState(false)
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false)
  const [targetCellIndex, setTargetCellIndex] = useState(null)

  const [currentPage, setCurrentPage] = useState(Math.ceil((parseInt(spriteIndex) + 1) / perPage))
  const currentPageStart = ((currentPage - 1) * perPage) + 1
  const currentPageEnd = currentPage * perPage

  const selectedTool = useSelector(getCurrentTool)
  const projectPaletteClass = useSelector(getCurrentProjectPaletteClass)

  const handleClick = (targetIndex) => {
    if (cloneSpriteMode === true) {
      setTargetCellIndex(targetIndex)
      if (parseInt(targetIndex) !== parseInt(spriteIndex)) {
        setConfirmModalIsOpen(true)
      }
    } else {
      history.push(`/projects/${projectId}/${sceneIndex}/${targetIndex}`)
    }
  }

  const handleConfirmStamp = () => {
    setConfirmModalIsOpen(false)
    dispatch(copyAndPasteSprite({ 
      sceneIndex,
      sourceIndex: spriteIndex,
      targetIndex: targetCellIndex,
    }))
      .then(({ projectId, updatedProject }) => {
        updateProject({ projectId, updatedProject })
      })
  }

  return (
    <div className='relative'>
      <HelpBox isShowing={cloneSpriteMode} zIndex={'z-16'} bgClass={'bg-gray-800'} textClass={'text-white'}>
        Click a cell below to copy the selected sprite to it
      </HelpBox>
      <div className={styles.spriteList + ' bg-white relative z-16'}>
        <div className={styles.spriteListRow}>
          {getPagedIndexes(currentPage, perPage).map((index) => (
            <Sprite
              key={index}
              spriteIndex={index}
              cursor='pointer'
              isSelected={parseInt(index) === parseInt(spriteIndex)}
              isDraggable={selectedTool === SCENE_TOOLS.MOVE && !cloneSpriteMode}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
      <div className='flex items-center justify-between text-xs border-t border-gray-100 bg-white pl-2 relative z-17'>
        <div>Sprites [{currentPageStart}-{currentPageEnd}]</div>
        <div className='flex border-l divide-x divide-gray-200'>
          {pages.map((page) => {
            const buttonClass = page === currentPage ? selectedClass : defaultClass
            return (
              <button
                key={page}
                className={`${buttonClass} w-8`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            )
          })}
          <button
            className={defaultClass + (cloneSpriteMode ? ' text-indigo-500' : '') + ' w-12'}
            onClick={() => setCloneSpriteMode(!cloneSpriteMode)}
          >
            <DocumentDuplicateIcon className='h-5 w-5 block' />
          </button>
        </div>
      </div>

      <Overlay
        bgClass={'bg-indigo-700'}
        zIndex={'z-15'}
        isOpen={cloneSpriteMode}
        onClick={() => setCloneSpriteMode(false)}
      />

      <Modal
        isOpen={confirmModalIsOpen}
        setIsOpen={setConfirmModalIsOpen}
        confirmHandler={handleConfirmStamp}
      >
        <div className={`bg-white w-full flex flex-col ${projectPaletteClass}`}>
          <div className='py-2'>Sprite {spriteIndex + 1}</div>
          <div className='block h-20 w-20 border-solid border-4 border-black'>
            <SpritePreview spriteIndex={spriteIndex} />
          </div>
          <div className='py-2'>will overwrite sprite {targetCellIndex + 1}</div>
          <div className='block h-20 w-20 border-solid border-4 border-black'>
            <SpritePreview spriteIndex={targetCellIndex} />
          </div>
          <div className='py-2'>Are you sure?</div>
        </div>
      </Modal>
    </div>
  )
}

export default React.memo(SpriteList)
