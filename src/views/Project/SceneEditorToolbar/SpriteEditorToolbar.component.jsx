import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HandIcon, ArrowCircleDownIcon } from '@heroicons/react/outline';

import { SCENE_TOOLS } from '@/App.constants';
import { getSelectedTool, setSelectedTool } from '@store/sceneEditor/sceneEditor.slice';

import styles from './SceneEditorToolbar.module.scss';

const buttonClassesBase = 'relative inline-flex items-center px-4 py-2 text-sm font-medium';
const buttonClasses = `${buttonClassesBase} text-gray-800 bg-white hover:bg-gray-50`;
const buttonActiveClasses = `${buttonClassesBase} text-gray-50 bg-indigo-500 hover:bg-indigo-500 focus:z-10`;
const iconClasses = 'block h-5 w-5';

const SceneEditorToolbar = (props) => {
  const dispatch = useDispatch();
  const selectedTool = useSelector(getSelectedTool);

  const buttons = [
    {tool: SCENE_TOOLS.MOVE, icon: <HandIcon className={iconClasses} />},
    {tool: SCENE_TOOLS.STAMP, icon: <ArrowCircleDownIcon className={iconClasses} />},
  ];

  const handleToolClick = tool => dispatch(setSelectedTool({tool}));

  return (
    <div className={styles.sceneEditorToolbar + ' shadow-sm bg-gray-50 w-full'}>
      {buttons.map(button => {
        return (
          <button
            key={button.tool}
            type="button"
            className={button.tool === selectedTool ? buttonActiveClasses : buttonClasses}
            onClick={() => handleToolClick(button.tool)}
          >
            {button.icon}
          </button>
        )
      })}
    </div>
  );
}

export default SceneEditorToolbar;
