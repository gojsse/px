import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProjectScene, getProjectPaletteClass } from '@store/currentProject/currentProject.slice';
import { getSelectedScene, setSelectedScene } from '@store/sceneEditor/sceneEditor.slice';
import Grid from './Grid.component';

import styles from './SceneEditor.module.scss';

const SceneEditor = ({ sceneIndex }) => {
  const dispatch = useDispatch();
  const projectScene = useSelector(getProjectScene(sceneIndex));
  const selectedScene = useSelector(getSelectedScene);
  const paletteClass = useSelector(getProjectPaletteClass);

    console.log('projectScene', projectScene);

  useEffect(() => {
    dispatch(setSelectedScene({ scene: projectScene }));
  }, [dispatch, projectScene]);

  return (
    <div className={styles.sceneGrid + ' mb-2'}>
      <div className={paletteClass}>
        <Grid scene={selectedScene} />
      </div>
    </div>
  );
}

export default SceneEditor;
