import React from 'react'
import { useSelector } from 'react-redux'

import { getCurrentProjectScene } from '@store/currentProject/currentProject.slice'
import Grid from './Grid.component'

import styles from './SceneEditor.module.scss'

const SceneEditor = ({ sceneIndex }) => {
  const projectScene = useSelector(getCurrentProjectScene(sceneIndex))

  return (
    <div className={styles.sceneGrid + ' bg-gray-100 bg-stripes bg-stripes-white'}>
      <Grid scene={projectScene} sceneIndex={sceneIndex} />
    </div>
  )
}

export default SceneEditor
