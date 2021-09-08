import React from 'react';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';

import { getProjectSpritesPaged } from '@store/currentProject/currentProject.slice';
import { getProjectPaletteClass } from '@store/currentProject/currentProject.slice';
import Sprite from '@views/Project/Sprite/Sprite.component';

import styles from './SpriteList.module.css';

const SpriteList = (props) => {
  const history = useHistory();
  const { projectId, sceneIndex } = useParams();

  const sprites = useSelector(getProjectSpritesPaged(1, 16));
  const paletteClass = useSelector(getProjectPaletteClass);

  const handleSpriteClick = spriteIndex => {
    history.push(`/project/${projectId}/${sceneIndex}/${spriteIndex}`);
  }

  return (
    <div className={paletteClass}>
      <div className={styles.spriteList}>
        <div className={styles.spriteListRow}>
          {sprites.map((sprite, index) => {
            return <Sprite key={index} spriteIndex={index} onClick={handleSpriteClick} />
          })}
        </div>
      </div>
    </div>
  );
}

export default SpriteList;
