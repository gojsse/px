import React from 'react';
import { useDispatch } from 'react-redux';

import { SwitchHorizontalIcon, SwitchVerticalIcon, ArrowSmUpIcon, ArrowSmRightIcon, ArrowSmDownIcon, ArrowSmLeftIcon, ReplyIcon } from '@heroicons/react/outline';

import { moveSpriteUp,moveSpriteRight, moveSpriteDown, moveSpriteLeft, flipSpriteVertical, flipSpriteHorizontal, rotateSpriteRight, rotateSpriteLeft } from '@store/spriteEditor/spriteEditor.slice';

import styles from './SpriteEditorActionbar.module.css';

const buttonClassesBase = 'relative inline-flex items-center px-4 py-2 text-sm font-medium';
const buttonClasses = `${buttonClassesBase} text-gray-800 bg-white hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`;
const iconClasses = 'block h-5 w-5';

const buttonAttributes = {
  type: 'button',
  className: buttonClasses
}

const SpriteEditorActionbar = (props) => {
  const dispatch = useDispatch();

  // TODO in here we need to update the main store after each action is run

  return (
    <div className={styles.spriteEditorActionbar + ' shadow-sm bg-gray-50 mb-2 w-full'}>
      <button {...buttonAttributes} onClick={() => dispatch(moveSpriteUp())}>
        <ArrowSmUpIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => dispatch(moveSpriteRight())}>
        <ArrowSmRightIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => dispatch(moveSpriteDown())}>
        <ArrowSmDownIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => dispatch(moveSpriteLeft())}>
        <ArrowSmLeftIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => dispatch(flipSpriteVertical())}>
        <SwitchVerticalIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => dispatch(flipSpriteHorizontal())}>
        <SwitchHorizontalIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => dispatch(rotateSpriteLeft())}>
        <ReplyIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => dispatch(rotateSpriteRight())}>
        <ReplyIcon className={iconClasses} style={{transform: 'scaleX(-1)'}} /> 
      </button>
    </div>
  );
}

export default SpriteEditorActionbar;
