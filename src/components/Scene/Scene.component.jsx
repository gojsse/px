import React from 'react';
import { useSelector } from 'react-redux';

import { getProjectScene } from '@store/projects/projects.slice';
import { getProjectPaletteClass } from '@store/currentProject/currentProject.slice';
import Sprite from '@components/Sprite/Sprite.component';

import styles from './Scene.module.scss';

const Scene = ({ projectId, sceneIndex }) => {
  const paletteClass = useSelector(getProjectPaletteClass);
  const scene = useSelector(getProjectScene(projectId, sceneIndex));

  return (
    <div className={paletteClass}>
      {scene.spriteSheet.map((row, rowIndex) => (
        <div key={`${rowIndex}`} className={styles.row}>
          {row.map((cell, cellIndex) => (
            <Sprite key={`${rowIndex}_${cellIndex}`} projectId={projectId} spriteIndex={cell.id} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Scene;
