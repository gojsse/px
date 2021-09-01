/* This example requires Tailwind CSS v2.0+ */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SiteMenu from './SiteMenu.component'

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
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
                          {/* <Projects /> */}
                        </Route>
                        <Route path="/settings">
                          {/* <Settings /> */}
                        </Route>
                        <Route path="/">
                          <div>dashboard</div>
                          {/* <Dashboard /> */}
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
      </Router>
    </div>
  )
}
