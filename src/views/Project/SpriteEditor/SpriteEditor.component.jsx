import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProjectSprite, getProjectPaletteClass } from '@store/currentProject/currentProject.slice';
import { getSelectedSprite, setSelectedSprite } from '@store/spriteEditor/spriteEditor.slice';
import ColorSelector from '@views/Project/ColorSelector/ColorSelector.component'

import styles from './SpriteEditor.module.css';

const SpriteEditor = (props) => {
  const dispatch = useDispatch();
  const projectSprite = useSelector(getProjectSprite(1));
  const paletteClass = useSelector(getProjectPaletteClass);
  const selectedSprite = useSelector(getSelectedSprite);

  useEffect(() => {
    dispatch(setSelectedSprite({sprite: projectSprite}));
  }, [projectSprite]);

  const flatSprite = selectedSprite.flat();

  return (
    <div>
      <div className="bg-white overflow-hidden shadow">
        <div className="flex-shrink-0">
          {/* <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true" /> */}
        </div>
        <div className={paletteClass}>
          <div className={styles.spriteGrid}>
            {flatSprite.map((cell, index) => {
              return (
                <button
                  key={index}
                  className={`color--${cell}`}
                />
              )
            })}
          </div>
        </div>

        <ColorSelector />
      </div>
    </div>
  );
}

// export default React.memo(SpriteEditor);
export default SpriteEditor;
