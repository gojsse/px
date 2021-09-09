import React from 'react';
import { useDispatch } from 'react-redux';

import { SwitchHorizontalIcon, SwitchVerticalIcon, ArrowSmUpIcon, ArrowSmRightIcon, ArrowSmDownIcon, ArrowSmLeftIcon } from '@heroicons/react/outline';

import { moveSceneUp, moveSceneRight, moveSceneDown, moveSceneLeft, flipSceneVertical, flipSceneHorizontal } from '@store/sceneEditor/sceneEditor.slice';
import { handleSceneActionButton } from '@store/actions';

import styles from './SceneEditorActionbar.module.css';

const buttonClassesBase = 'relative inline-flex items-center px-4 py-2 text-sm font-medium';
const buttonClasses = `${buttonClassesBase} text-gray-800 bg-white hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`;
const iconClasses = 'block h-5 w-5';

const buttonAttributes = {
  type: 'button',
  className: buttonClasses,
  style: {width: '12.5%'}
}

const SceneEditorActionbar = (props) => {
  const dispatch = useDispatch();

  const handleClick = (buttonAction) => {
    dispatch(handleSceneActionButton(buttonAction));
  }

  return (
    <div className={styles.spriteEditorActionbar + ' shadow-sm bg-gray-50 mb-4 w-full'}>
      <button {...buttonAttributes} onClick={() => handleClick(moveSceneLeft)}>
        <ArrowSmLeftIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => handleClick(moveSceneUp)} >
        <ArrowSmUpIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => handleClick(moveSceneDown)}>
        <ArrowSmDownIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => handleClick(moveSceneRight)}>
        <ArrowSmRightIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => handleClick(flipSceneVertical)}>
        <SwitchVerticalIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => handleClick(flipSceneHorizontal)}>
        <SwitchHorizontalIcon className={iconClasses} />
      </button>
    </div>
  );
}

export default SceneEditorActionbar;
