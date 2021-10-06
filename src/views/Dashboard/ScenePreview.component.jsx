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
        'margin-top': '-10%',
        'margin-right': '-10%',
        'margin-bottom': '-10%',
        'margin-left': '-10%',
      }}
    >
      <Scene scene={scene} sprites={sprites} />
    </div>
  )
}

export default ScenePreview
