import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getCurrentProjectScene } from '@store/currentProject/currentProject.slice'
import { getCurrentScene, setCurrentScene, setCurrentSceneIndex } from '@store/sceneEditor/sceneEditor.slice'
import Grid from './Grid.component'

import styles from './SceneEditor.module.scss'

const SceneEditor = ({ sceneIndex }) => {
  const dispatch = useDispatch()
  // TODO this is really confusing. Make it simpler?
  const projectScene = useSelector(getCurrentProjectScene(sceneIndex))
  const selectedScene = useSelector(getCurrentScene)

  useEffect(() => {
    dispatch(setCurrentScene({ scene: projectScene }))
    dispatch(setCurrentSceneIndex({ sceneIndex }))
  }, [dispatch, projectScene, sceneIndex])

  return (
    <div className={styles.sceneGrid + ' bg-gray-100 bg-stripes bg-stripes-white mb-2'}>
      <Grid scene={selectedScene} />
    </div>
  )
}

export default SceneEditor
