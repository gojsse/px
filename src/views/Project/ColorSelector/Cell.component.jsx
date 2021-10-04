import React from 'react'

import styles from './Cell.module.scss'

const Cell = (props) => {
  const {
    value,
    isSelected = false,
    onClick
  } = props

  return (
    <button
      className={`color color--${value} ${styles.cell}` + (isSelected ? ' ' + styles.cellSelected : '')}
      onClick={() => onClick(value)}
    />
  )
}

export default Cell
