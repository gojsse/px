import { Fragment } from 'react'
import { Transition } from '@headlessui/react'

type ComponentProps = {
  // children
  children: React.ReactNode
  // background class(es)
  bgClass: string
  // z-index value
  zIndex: string
  // value determines if dialog should be open or not
  isOpen: boolean
  // click function for clicking on overlay
  onClick: () => void
}

const Overlay = ({
  children,
  bgClass = 'bg-gray-500',
  zIndex = 'z-15',
  isOpen,
  onClick
}: ComponentProps) => {

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <div className={`fixed inset-0 overflow-y-auto ${zIndex}`} onClick={onClick}>
        <div className='flex items-end justify-center min-h-screen sm:block'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className={`fixed inset-0 bg-opacity-75 transition-opacity ${bgClass}`}>
              {children}
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition.Root>
  )
}

export default Overlay
