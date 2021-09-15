import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { PencilAltIcon, CogIcon } from '@heroicons/react/solid';

import { getProjects } from '@store/projects/projects.slice';

const Projects = (props) => {
  const projects = useSelector(getProjects);

  return (
    <div className='class'>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects.map((project) => (
          <li
            key={project.id}
            className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
          >
            <div className="flex-1 flex flex-col p-8">
              {/* <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={person.imageUrl} alt="" /> */}
              <h3 className="mt-6 text-gray-900 text-sm font-medium">{project.name}</h3>
              <dl className="mt-1 flex-grow flex flex-col justify-between">
                <dt className="sr-only">Title</dt>
                <dd className="text-gray-500 text-sm">{project.name}</dd>
                <dt className="sr-only">ID</dt>
                <dd className="mt-3">
                  <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                    {project.id}
                  </span>
                </dd>
              </dl>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="w-0 flex-1 flex">
                  <NavLink
                    exact
                    to='/project/0/0/0'
                    className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                  >
                    <PencilAltIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-3">Open</span>
                  </NavLink>
                </div>
                <div className="-ml-px w-0 flex-1 flex">
                  <a
                    href={`tel:#`}
                    className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                  >
                    <CogIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-3">Settings</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>    
    </div>
  );
}

export default Projects;
