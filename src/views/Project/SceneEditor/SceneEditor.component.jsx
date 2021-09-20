import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getSelectedProjectScene, getSelectedProjectPaletteClass } from '@store/currentProject/currentProject.slice'
import { getSelectedScene, setSelectedScene } from '@store/sceneEditor/sceneEditor.slice'
import Grid from './Grid.component'

import styles from './SceneEditor.module.scss'

const SceneEditor = ({ sceneIndex }) => {
  const dispatch = useDispatch()
  const projectScene = useSelector(getSelectedProjectScene(sceneIndex))
  const selectedScene = useSelector(getSelectedScene)
  const paletteClass = useSelector(getSelectedProjectPaletteClass)

  useEffect(() => {
    console.log('is this happening like it should bew?')
    dispatch(setSelectedScene({ scene: projectScene }))
  }, [dispatch, projectScene])

  return (
    <div className={styles.sceneGrid + ' bg-gray-100 bg-stripes bg-stripes-white mb-2'}>
      <div className={paletteClass}>
        <Grid scene={selectedScene} />
      </div>
    </div>
  )
}

export default SceneEditor
