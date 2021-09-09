import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';

import { getProjectSpritesPaged } from '@store/currentProject/currentProject.slice';
import { getProjectPaletteClass } from '@store/currentProject/currentProject.slice';
import Sprite from '@views/Project/Sprite/Sprite.component';

import styles from './SpriteList.module.css';

const SpriteList = props => {
  const history = useHistory();
  const { projectId, sceneIndex } = useParams();

  const sprites = useSelector(getProjectSpritesPaged(1, 32));
  const paletteClass = useSelector(getProjectPaletteClass);
  const [page, setPage] = useState(1);

  const handleClick = (spriteIndex) => {
    console.log('do we need to do anything?')
  }

  const handleDoubleClick = (spriteIndex) => {
    history.push(`/project/${projectId}/${sceneIndex}/${spriteIndex}`);
    // setSelectedSprite([ ...props.sprite ]);
    // setSelectedSpriteIndex(props.spriteIndex);
  }

  return (
    <div className={paletteClass}>
      <div className={styles.spriteList}>
        <div className={styles.spriteListRow}>
          {sprites.map((sprite, spriteIndex) => (
            <Sprite
              key={spriteIndex}
              spriteIndex={spriteIndex}
              onClick={() => handleClick(spriteIndex)}
              onDoubleClick={() => handleDoubleClick(spriteIndex)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SpriteList;
