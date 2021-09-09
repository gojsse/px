import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';

import { Switch, Route } from "react-router-dom";

import SiteMenu from '@components/layout/NavBar.component';
import Dashboard from '@views/Dashboard/Dashboard.component';
import Projects from '@views/Projects/Projects.component';
import Project from '@views/Project/Project.component';
import Settings from '@views/Settings/Settings.component';

import { initializeProjectState } from '@store/currentProject/currentProject.slice';

import mockProjects from './__mocks__/MOCK_PROJECTS.json';

import './App.css';
import './styles/styles.scss';

const routes = [
  // { path: '/project/:projectKey/scene/:sceneId/edit', component: SceneEditor },
  // { path: '/project/:projectKey/scene/:sceneId/export', component: SceneExporter },
  { path: '/project/:projectId/:sceneIndex/:spriteIndex', component: Project },
  { path: '/project/:projectId', component: Project },
  { path: '/projects', component: Projects },
  { path: '/settings', component: Settings },
  { path: '/', component: Dashboard },
]

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeProjectState({project: mockProjects[0]}));
    // return () => {
    //   cleanup
    // }
  }, [dispatch])

  return (
    <div className="App bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300">
      <div className="min-h-screen">
        <SiteMenu />
        <div className="py-10">
          {/* <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">Projects</h1>
            </div>
          </header> */}
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 sm:px-0">
                <Switch>
                  {routes.map(route => <Route key={route.path} path={route.path} component={route.component} />)}
                </Switch>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
