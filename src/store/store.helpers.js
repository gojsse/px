export const flipGridHorizontal = (grid) => {
  grid.forEach((row, index) => {
    grid[index] = row.reverse()
  })
}

export const flipGridVertical = (grid) => {
  grid.reverse()
}

export const shiftGridUp = (grid) => {
  const firstRow = grid.shift()
  grid.push(firstRow)
}

export const shiftGridRight = (grid) => {
  grid.forEach(row => {
    const lastCell = row.pop()
    row.unshift(lastCell)
  })
}

export const shiftGridDown = (grid) => {
  const lastRow = grid.pop()
  grid.unshift(lastRow)
}

export const shiftGridLeft = (grid) => {
  grid.forEach(row => {
    const firstCell = row.shift()
    row.push(firstCell)
  })
}

export const rotateGridRight = (grid) => {
  const tempGrid = grid.map(row => ([ ...row.map(cell => cell) ]))
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      tempGrid[cellIndex][grid.length - rowIndex - 1] = cell
    })
  })
  return tempGrid
}

export const rotateGridLeft = (grid) => {
  const tempGrid = grid.map(row => ([ ...row.map(cell => cell) ]))
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      tempGrid[grid.length - cellIndex - 1][rowIndex] = cell
    })
  })
  return tempGrid
}
