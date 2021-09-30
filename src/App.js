import React from 'react'
import { Switch, Route } from "react-router-dom"

// import { useGetAllProjectsQuery } from '@store/projects/allProjects.api'

import SiteMenu from '@components/layout/NavBar.component'
import Dashboard from '@views/Dashboard/Dashboard.component'
import Projects from '@views/Projects/Projects.component'
import Project from '@views/Project/Project.component'
import Settings from '@views/Settings/Settings.component'

import './App.css'
import './styles/styles.scss'

const routes = [
  { path: '/projects/:projectId/:sceneIndex/:spriteIndex', component: Project },
  { path: '/projects', component: Projects },
  { path: '/settings', component: Settings },
  { path: '/', component: Dashboard },
]

function App() {
  // const { data, error, isLoading } = useGetAllProjectsQuery()
  // console.log('data, error, isLoading', data, error, isLoading)

  // const { data, error, isLoading } = useGetAllProjectsQuery(undefined, {
  //   selectFromResult: ({ data, error, isLoading }) => ({
  //     data: data,
  //     error,
  //     isLoading
  //   }),
  //   pollingInterval: 3000,
  // })

  return (
    <div className="App bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300">
      <div className="min-h-screen">
        <SiteMenu />
        <div className="py-10">
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 sm:px-0">
                <Switch>
                  {routes.map(route => (
                    <Route
                      key={route.path}
                      path={route.path}
                      component={route.component}
                    />
                  ))}
                </Switch>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App