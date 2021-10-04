import React from 'react'
import { useDispatch } from 'react-redux'

import { SwitchHorizontalIcon, SwitchVerticalIcon, ArrowSmUpIcon, ArrowSmRightIcon, ArrowSmDownIcon, ArrowSmLeftIcon, ReplyIcon } from '@heroicons/react/outline'

import { useUpdateProjectMutation } from '@store/currentProject/currentProject.api'
import { handleSpriteActionButton } from '@store/currentProject/currentProject.actions'
import { shiftSpriteUp, shiftSpriteRight, shiftSpriteDown, shiftSpriteLeft, flipSpriteVertical, flipSpriteHorizontal, rotateSpriteRight, rotateSpriteLeft } from '@store/currentProject/currentProject.slice'

import styles from './SpriteEditorActionbar.module.scss'

const buttonClassesBase = 'relative inline-flex items-center px-4 py-2 text-sm font-medium'
const buttonClasses = `${buttonClassesBase} text-gray-800 bg-white hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`
const iconClasses = 'block h-5 w-5'

const buttonAttributes = {
  type: 'button',
  className: buttonClasses
}

const SpriteEditorActionbar = ({ spriteIndex }) => {
  const dispatch = useDispatch()
  const [ updateProject ] = useUpdateProjectMutation()

  const handleClick = (buttonAction) => {
    dispatch(handleSpriteActionButton({ spriteIndex, buttonAction }))
      .then(({ projectId, updatedProject }) => {
        updateProject({ projectId, updatedProject })
      })
  }

  return (
    <div className={styles.spriteEditorActionbar + ' w-full mb-2'}>
      <button {...buttonAttributes} onClick={() => handleClick(shiftSpriteLeft)}>
        <ArrowSmLeftIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => handleClick(shiftSpriteRight)}>
        <ArrowSmRightIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => handleClick(shiftSpriteUp)}>
        <ArrowSmUpIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => handleClick(shiftSpriteDown)}>
        <ArrowSmDownIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => handleClick(flipSpriteHorizontal)}>
        <SwitchHorizontalIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => handleClick(flipSpriteVertical)}>
        <SwitchVerticalIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => handleClick(rotateSpriteLeft)}>
        <ReplyIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => handleClick(rotateSpriteRight)}>
        <ReplyIcon className={iconClasses} style={{transform: 'scaleX(-1)'}} /> 
      </button>
    </div>
  )
}

export default SpriteEditorActionbar
