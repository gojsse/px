/**
 * Generates a random string (letters and numbers)
 *
 * @returns string
 */
export const ID = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Finds regions of connected space in the provided grid array
 *
 * @param {array} grid 
 * @returns 
 */
export const scanForGridRegions = (grid) => {
  if (Array.isArray(grid) === false) {
    return
  }

  const labeledGrid = []
  const groups = []

  // Label cells in preliminary groups
  grid.forEach((row, rowIndex) => {
    labeledGrid[rowIndex] = []

    row.forEach((colValue, colIndex) => {
      const westValue = colIndex > 0 ? grid[rowIndex][colIndex - 1] : -1
      const northValue = rowIndex > 0 ? grid[rowIndex - 1][colIndex] : -1
      const westLabel = colIndex > 0 ? labeledGrid[rowIndex][colIndex - 1] : -1
      const northLabel = rowIndex > 0 ? labeledGrid[rowIndex - 1][colIndex] : -1

      if (colValue === westValue) {
        if (colValue === northValue && westLabel !== northLabel) {
          const min = Math.min(westLabel, northLabel)
          const max = Math.max(westLabel, northLabel)
          const lowestMatchedIndex = groups.findIndex(subSet => subSet.has(min))
          groups[lowestMatchedIndex].add(max)
          groups[max] = groups[lowestMatchedIndex]
          labeledGrid[rowIndex][colIndex] = min
        } else {
          labeledGrid[rowIndex][colIndex] = westLabel
        }
      }

      if (colValue !== westValue) {
        if (colValue === northValue) {
          labeledGrid[rowIndex][colIndex] = northLabel
        } else {
          const newGroup = new Set()
          newGroup.add(groups.length)
          groups.push(newGroup)
          labeledGrid[rowIndex][colIndex] = groups.length - 1
        }
      }
    })
  })

  // Group equivalents
  const processedLabeledGrid = labeledGrid.map(row => {
    return row.map(colValue => {
      const setArray = []
      groups[colValue].forEach(value => {
        setArray.push(value)
      })
      const minValue = Math.min(...setArray)
      return minValue
    })
  })

  return processedLabeledGrid
}
