import React from 'react';

import styles from './Cell.module.scss';

const Cell = (props) => {
  const {
    isSelected = false,
    children,
  } = props;

  return (
    <div className={`${styles.cell}` + (isSelected ? ' ' + styles.cellSelected : '')}>
      {children}
    </div>
  );
}

export default Cell;
