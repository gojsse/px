import React from 'react'

import Scene from '@components/Scene/Scene.component'

const ScenePreview = ({ project }) => {
  const scene = project.scenes[0]
  const sprites = project.sprites
  const paletteClass = `palette palette--${!project.palette ? 'default' : project.palette}`

  return (
    <div
      className={`${paletteClass} animate-pulse animate-wiggle`}
      style={{
        'width': '120%',
        'marginTop': '-10%',
        'marginRight': '-10%',
        'marginBottom': '-10%',
        'marginLeft': '-10%',
      }}
    >
      <Scene scene={scene} sprites={sprites} />
    </div>
  )
}

export default ScenePreview
