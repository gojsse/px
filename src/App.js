import { Switch, Route } from 'react-router-dom'

import SiteMenu from '@components/layout/NavBar.component'
import Dashboard from '@views/Dashboard/Dashboard.component'
import Projects from '@views/Projects/Projects.component'
import Project from '@views/Project/Project.component'
import ProjectEdit from '@views/ProjectEdit/ProjectEdit.component'
import Settings from '@views/Settings/Settings.component'

import './App.css'
import './styles/styles.scss'

const routes = [
  { path: '/projects/:projectId/:sceneIndex/:spriteIndex', component: ProjectEdit },
  { path: '/projects/:projectId', component: Project },
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
    <div className='bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300'>
      <div className='min-h-screen'>
        <SiteMenu />
        <main>
          <Switch>
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
              />
            ))}
          </Switch>
        </main>
      </div>
    </div>
  )
}

export default App
