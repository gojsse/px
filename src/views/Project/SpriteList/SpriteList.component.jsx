import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';

import { getProjectSpritesPaged } from '@store/currentProject/currentProject.slice';
import { getProjectPaletteClass } from '@store/currentProject/currentProject.slice';
import Sprite from '@views/Project/Sprite/Sprite.component';

import styles from './SpriteList.module.scss';

const SpriteList = props => {
  const history = useHistory();
  const { projectId, sceneIndex } = useParams();

  const sprites = useSelector(getProjectSpritesPaged(1, 32));
  const paletteClass = useSelector(getProjectPaletteClass);
  const [page, setPage] = useState(1);
  const [isMouseOver, setMouseIsOver] = useState(false);
  const [isHoveringAwhile, setIsHoveringAwhile] = useState(false);

  useEffect(() => {
    let timer;
    if (isMouseOver) {
      timer = setTimeout(() => {
        // console.log('This will run after 2 second2!')
        setIsHoveringAwhile(true);
      }, 1000);
    } else {
      clearTimeout(timer);
      setIsHoveringAwhile(false);
    }

    return () => clearTimeout(timer);
  }, [isMouseOver]);

  const dragOverHandler = event => {
    setMouseIsOver(true);
    event.preventDefault();
    // console.log('dragging over', rowIndex, colIndex);
  }

  const dragLeaveHandler = () => {
    setMouseIsOver(false);
    setIsHoveringAwhile(false);
  }

  const handleClick = (spriteIndex) => {
    
  }

  const handleDoubleClick = (spriteIndex) => {
    history.push(`/project/${projectId}/${sceneIndex}/${spriteIndex}`);
  }

  // TODO I guess we need to make 'cells' for this to drop things into?
  //   onDragLeave={dragLeaveHandler}
  //   onDragEnd={dragLeaveHandler}
  //   onMouseOut={dragLeaveHandler}

  // isHoveringAwhile ? 'border-dashed border-4 border-light-blue-500' : ''

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
