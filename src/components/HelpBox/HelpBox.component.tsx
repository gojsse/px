import React, { Fragment } from 'react'
import { Transition } from '@headlessui/react'

type ComponentProps = {
  // children
  children: React.ReactNode
  // background class(es)
  bgClass: string
  // text color
  textClass: string
  // z-index value
  zIndex: string
  // value determines if help box should be open or not
  isShowing: boolean
}

const HelpBox = ({
  children,
  bgClass = 'bg-white',
  textClass = 'text-black',
  zIndex = 'z-16',
  isShowing,
}: ComponentProps) => {

  // Types of transitions.
  // fade in/scale
  // slide up

  return (
    <Transition
      show={isShowing} 
      as={Fragment}
      enter='transform transition duration-[500ms] bottom-0'
      enterFrom='opacity-0 rotate-[-120deg] scale-50 bottom-0'
      enterTo='opacity-100 rotate-0 scale-100 bottom-0'
      leave='transform duration-500 transition ease-in-out'
      leaveFrom='opacity-100 rotate-0 scale-100'
      leaveTo='opacity-0 scale-95'
    >
      <div className={`absolute w-full p-2 flex justify-center items-center text-sm rounded-sm ${textClass} ${bgClass} ${zIndex}`} style={{'bottom': '105%'}}>
        {children}
      </div>
    </Transition>
  )
}

export default HelpBox
