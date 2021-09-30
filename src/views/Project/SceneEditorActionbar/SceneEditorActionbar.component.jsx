import React from 'react'
import { useDispatch } from 'react-redux'

import { SwitchHorizontalIcon, SwitchVerticalIcon, ArrowSmUpIcon, ArrowSmRightIcon, ArrowSmDownIcon, ArrowSmLeftIcon, LightningBoltIcon } from '@heroicons/react/outline'

import { moveSceneUp, moveSceneRight, moveSceneDown, moveSceneLeft, flipSceneVertical, flipSceneHorizontal, clearSceneSprites } from '@store/sceneEditor/sceneEditor.slice'
import { handleSceneActionButton } from '@store/sceneEditor/sceneEditor.actions'
import { useUpdateProjectMutation } from '@store/currentProject/currentProject.api'

import styles from './SceneEditorActionbar.module.scss'

const buttonClassesBase = 'relative inline-flex items-center px-4 py-2 text-sm font-medium'
const buttonClasses = `${buttonClassesBase} text-gray-800 bg-white hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`
const iconClasses = 'block h-5 w-5'

const buttonAttributes = {
  type: 'button',
  className: buttonClasses,
}

const SceneEditorActionbar = (props) => {
  const dispatch = useDispatch()
  const [ updateProject ] = useUpdateProjectMutation()

  const handleClick = (buttonAction) => {
    dispatch(handleSceneActionButton(buttonAction))
      .then(({ projectId, updatedProject }) => {
        updateProject({ projectId, updatedProject })
      })
  }

  return (
    <div className={styles.sceneEditorActionbar + ' mb-2 w-full'}>
      <button {...buttonAttributes} onClick={() => handleClick(moveSceneLeft)}>
        <ArrowSmLeftIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => handleClick(moveSceneRight)}>
        <ArrowSmRightIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => handleClick(moveSceneUp)} >
        <ArrowSmUpIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => handleClick(moveSceneDown)}>
        <ArrowSmDownIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => handleClick(flipSceneHorizontal)}>
        <SwitchHorizontalIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => handleClick(flipSceneVertical)}>
        <SwitchVerticalIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => handleClick(clearSceneSprites)}>
        <LightningBoltIcon className={iconClasses} />
      </button>
    </div>
  )
}

export default SceneEditorActionbar
