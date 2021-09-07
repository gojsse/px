import React from 'react';

import Sprite from '@views/Project/Sprite/Sprite.component';

const Cell = ({ sprite }) => {

  return (
    <div className='sprite-sheet-grid__cell'>
      {sprite !== null && (
        <Sprite spriteIndex={sprite.id} />
      )}
    </div>
  );
}

export default React.memo(Cell);
