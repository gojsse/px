import React from 'react';
import { NavLink } from "react-router-dom";

import { Disclosure } from '@headlessui/react'
import { AdjustmentsIcon, ViewGridIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

const navigation = [
  { name: 'Dashboard', href: ''},
  { name: 'Projects', href: '/projects'},
  { name: 'Project 1', href: '/project/1'},
]

const navLinkClasses = {
  activeClassName: 'border-indigo-500 text-gray-900',
  className: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
}

const navLinkClassesMobile = {
  activeClassName: 'bg-indigo-50 border-indigo-500 text-indigo-700',
  className: 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
}

const SiteMenu = (props) => {

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <NavLink
                    exact
                    to='/'
                    activeClassName='text-indigo-500'
                    className='text-gray-500'
                  >
                    <ViewGridIcon className="block h-6 w-6" />
                  </NavLink>
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <NavLink
                      exact
                      key={item.name}
                      to={item.href}
                      { ...navLinkClasses }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <NavLink
                  exact
                  to='/settings'
                  activeClassName='text-indigo-500'
                  className='text-gray-500'
                >
                  <AdjustmentsIcon className="block h-6 w-6" />
                </NavLink>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  exact
                  key={item.name}
                  to={item.href}
                  { ...navLinkClassesMobile }
                >
                  {item.name}
                </NavLink>
              ))}
              <div>Settings</div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default SiteMenu;
