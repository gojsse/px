import React from 'react'

import Scene from '@components/Scene/Scene.component'

const ScenePreview = ({ project }) => {
  const scene = project.scenes[0]
  const sprites = project.sprites
  const paletteClass = `palette palette--${!project.palette ? 'default' : project.palette}`

  return (
    <div className={`${paletteClass}`}>
      <div className='flex-1 flex flex-col'>
        <Scene scene={scene} sprites={sprites} />
      </div>
    </div>
  )
}

export default ScenePreview
