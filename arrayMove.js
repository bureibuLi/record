// Move the elements inside the array and generate a new array
const ArrayMove = (arr, previousIndex, newIndex) => {
  const array = arr.slice(0)

  if (newIndex === -1) {
    // delete element
    array.splice(previousIndex, 1)
  } else {
    // add undefined element while newIndex>array.length
    if (newIndex >= array.length) {
      let k = newIndex - array.length

      while (k-- + 1) {
        array.push(undefined)
      }
    }
    // set new array
    array.splice(newIndex, 0, array.splice(previousIndex, 1)[0])
  }

  return array
}

export {ArrayMove}