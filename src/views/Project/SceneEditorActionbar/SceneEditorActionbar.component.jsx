import React from "react";
import { useDispatch } from "react-redux";

import {
  SwitchHorizontalIcon,
  SwitchVerticalIcon,
  ArrowSmUpIcon,
  ArrowSmRightIcon,
  ArrowSmDownIcon,
  ArrowSmLeftIcon,
  LightningBoltIcon,
} from "@heroicons/react/outline";

import { handleSceneActionButton } from "@store/currentProject/currentProject.actions";
import {
  shiftSceneUp,
  shiftSceneRight,
  shiftSceneDown,
  shiftSceneLeft,
  flipSceneVertical,
  flipSceneHorizontal,
  clearSceneSprites,
} from "@store/currentProject/currentProject.slice";

import styles from "./SceneEditorActionbar.module.scss";

const buttonClassesBase =
  "relative inline-flex items-center px-4 py-2 text-sm font-medium";
const buttonClasses = `${buttonClassesBase} text-gray-800 bg-white hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`;
const iconClasses = "block h-5 w-5";

const buttonAttributes = {
  type: "button",
  className: buttonClasses,
};

const SceneEditorActionbar = ({ sceneIndex }) => {
  const dispatch = useDispatch();

  const handleClick = (buttonAction) => {
    dispatch(handleSceneActionButton({ sceneIndex, buttonAction }));
  };

  return (
    <div className={styles.sceneEditorActionbar + " mb-2 w-full"}>
      <button {...buttonAttributes} onClick={() => handleClick(shiftSceneLeft)}>
        <ArrowSmLeftIcon className={iconClasses} />
      </button>
      <button
        {...buttonAttributes}
        onClick={() => handleClick(shiftSceneRight)}
      >
        <ArrowSmRightIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => handleClick(shiftSceneUp)}>
        <ArrowSmUpIcon className={iconClasses} />
      </button>
      <button {...buttonAttributes} onClick={() => handleClick(shiftSceneDown)}>
        <ArrowSmDownIcon className={iconClasses} />
      </button>
      <button
        {...buttonAttributes}
        onClick={() => handleClick(flipSceneHorizontal)}
      >
        <SwitchHorizontalIcon className={iconClasses} />
      </button>
      <button
        {...buttonAttributes}
        onClick={() => handleClick(flipSceneVertical)}
      >
        <SwitchVerticalIcon className={iconClasses} />
      </button>
      <button
        {...buttonAttributes}
        onClick={() => handleClick(clearSceneSprites)}
      >
        <LightningBoltIcon className={iconClasses} />
      </button>
    </div>
  );
};

export default SceneEditorActionbar;
