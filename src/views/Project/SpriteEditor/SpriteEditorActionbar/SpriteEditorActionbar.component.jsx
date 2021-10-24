import { useDispatch } from 'react-redux'

import {
  SwitchHorizontalIcon,
  SwitchVerticalIcon,
  ArrowSmUpIcon,
  ArrowSmRightIcon,
  ArrowSmDownIcon,
  ArrowSmLeftIcon,
  ReplyIcon,
} from '@heroicons/react/outline'

import { handleSpriteActionButton } from '@store/currentProject/currentProject.actions'
import {
  shiftSpriteUp,
  shiftSpriteRight,
  shiftSpriteDown,
  shiftSpriteLeft,
  flipSpriteVertical,
  flipSpriteHorizontal,
  rotateSpriteRight,
  rotateSpriteLeft,
} from '@store/currentProject/currentProject.slice'

import EditorActionbar from '../../../../components/EditorActionbar/EditorActionbar.component'

const iconClasses = 'block h-5 w-5'

const SpriteEditorActionbar = ({ spriteIndex }) => {
  const dispatch = useDispatch()

  const buttons = [
    {action: shiftSpriteLeft, icon: <ArrowSmLeftIcon className={iconClasses} />},
    {action: shiftSpriteRight, icon: <ArrowSmRightIcon className={iconClasses} />},
    {action: shiftSpriteUp, icon: <ArrowSmUpIcon className={iconClasses} />},
    {action: shiftSpriteDown, icon: <ArrowSmDownIcon className={iconClasses} />},
    {action: flipSpriteHorizontal, icon: <SwitchHorizontalIcon className={iconClasses} />},
    {action: flipSpriteVertical, icon: <SwitchVerticalIcon className={iconClasses} />},
    {action: rotateSpriteLeft, icon: <ReplyIcon className={iconClasses} />},
    {action: rotateSpriteRight, icon: <ReplyIcon className={iconClasses} style={{ transform: 'scaleX(-1)' }} />},
  ]

  const handleClick = (buttonAction) => {
    dispatch(handleSpriteActionButton({ spriteIndex, buttonAction }))
  }

  return (
    <EditorActionbar buttons={buttons} onClick={handleClick} />
  )
}

export default SpriteEditorActionbar
