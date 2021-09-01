import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';

import { Switch, Route } from "react-router-dom";

import SiteMenu from './components/layout/NavBar.component'
import Dashboard from '@views/Dashboard/Dashboard.component'
import Projects from '@views/Projects/Projects.component'
import Settings from '@views/Settings/Settings.component'

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="min-h-screen bg-gray-100">
        <SiteMenu />

        <div className="py-10">
          {/* <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">Projects</h1>
            </div>
          </header> */}
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              {/* Replace with your content */}
              <div className="px-4 py-8 sm:px-0">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                  <div className="app">
                    {/* <Menu classList="menu--nav" /> */}
                    <div className="page">
                      <Switch>
                        <Route path="/project/:projectKey/scene/:sceneId/edit">
                          {/* <SceneEditorProvider>
                              <SceneEditor />
                          </SceneEditorProvider> */}
                        </Route>
                        <Route path="/project/:projectKey/scene/:sceneId/export">
                          {/* <SceneExporter /> */}
                        </Route>
                        <Route path="/project/:projectKey">
                          {/* <Project /> */}
                        </Route>
                        <Route path="/projects">
                          <Projects />
                        </Route>
                        <Route path="/settings">
                          <Settings />
                        </Route>
                        <Route path="/">
                          <Dashboard />
                        </Route>
                      </Switch>
                    </div>
                  </div>
                </div>
              </div>
              {/* /End replace */}
            </div>
          </main>
        </div>
      </div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header> */}
    </div>
  );
}

export default App;
