import { FunctionComponent } from 'react'

import styles from './EditorActionbar.module.scss'

const buttonClassesBase ='relative inline-flex items-center px-4 py-2 text-sm font-medium'
const buttonClasses = `${buttonClassesBase} text-gray-800 bg-white hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`
// const iconClasses = 'block h-5 w-5'

interface EditorActionbarProps {
  buttons: {
    action: () => void
    icon: React.Component
  }[]
  onClick: (action: () => void) => void
}

const EditorActionbar: FunctionComponent<EditorActionbarProps> = ({
  buttons,
  onClick
}: EditorActionbarProps) => {

  return (
    <div className={styles.actionbar + ' w-full mb-2'}>
      {buttons.map((button, index) => {
        return (
          <button
            key={index}
            type='button'
            className={buttonClasses}
            onClick={() => onClick(button.action)}
          >
            {button.icon}
          </button>
        )
      })}
    </div>
  )
}

export default EditorActionbar
