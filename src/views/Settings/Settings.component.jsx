import React from 'react'

import packageJson from '@root/package.json'

const Settings = () => {

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-10">
      <h1>Settings</h1>
      <p>https://github.com/gojsse/px</p>
      <p>Built using Create React App</p>
      <p>Application version: { packageJson.version }</p>
      <p>React version: { packageJson.dependencies.react }</p>
    </div>
  )
}

export default Settings
