import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const Modal = ({
  children,
  isOpen,
  canSubmit = true,
  setIsOpen,
  confirmHandler,
  titleText,
  showConfirmButton = true,
  confirmButtonText,
  showCancelButton = true,
  cancelButtonText
}) => {
  const cancelButtonRef = useRef(null)

  const onConfirmClick = () => {
    if (canSubmit) {
      setIsOpen(false)
      confirmHandler()
    }
  }

  const disabledClass = !canSubmit ? ' opacity-50 cursor-not-allowed' : ''

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className='fixed z-20 inset-0 overflow-y-auto' initialFocus={cancelButtonRef} onClose={() => setIsOpen(false)}>
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-white px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
              <div>
                <div className='mt-3 sm:mt-5'>
                  <Dialog.Title as='h3' className='text-lg leading-6 font-medium text-gray-900'>
                    {titleText ?? 'Confirm'}
                  </Dialog.Title>
                  <div className='mt-2'>
                    {children}
                  </div>
                </div>
              </div>
              <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                {showConfirmButton && (
                  <button
                    type='button'
                    className={`w-full inline-flex justify-center border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm ${disabledClass}`}
                    onClick={onConfirmClick}
                  >
                    {confirmButtonText ?? 'Confirm'}
                  </button>
                )}
                {showCancelButton && (
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
                    ref={cancelButtonRef}
                    onClick={() => setIsOpen(false)}
                  >
                    {cancelButtonText ?? 'Cancel'}
                  </button>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
