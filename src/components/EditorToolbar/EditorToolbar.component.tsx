import { FunctionComponent } from 'react'

import styles from './EditorToolbar.module.scss'

const buttonClassesBase = 'relative inline-flex items-center px-4 py-2 text-sm font-medium'
const buttonClasses = `${buttonClassesBase} text-gray-800 bg-white hover:bg-gray-50`
const buttonActiveClasses = `${buttonClassesBase} text-gray-50 bg-indigo-500 hover:bg-indigo-500 focus:z-10`
// const iconClasses = 'block h-5 w-5'

interface EditorToolbarProps {
  buttons: {
    tool: string
    icon: React.Component
  }[]
  selectedTool: string
  onClick: (tool: string) => void
}

const EditorToolbar: FunctionComponent<EditorToolbarProps> = ({
  buttons,
  selectedTool,
  onClick
}: EditorToolbarProps) => {

  return (
    <div className={styles.toolbar + ' w-full'}>
      {buttons.map(button => {
        return (
          <button
            key={button.tool}
            type='button'
            className={button.tool === selectedTool ? buttonActiveClasses : buttonClasses}
            onClick={() => onClick(button.tool)}
          >
            {button.icon}
          </button>
        )
      })}
    </div>
  )
}

export default EditorToolbar
