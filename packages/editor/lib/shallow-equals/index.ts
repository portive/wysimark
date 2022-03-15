export function shallowEquals(arrA: any[], arrB: any[]) {
  if (arrA === arrB) {
    return true
  }

  if (!arrA || !arrB) {
    return false
  }

  const len = arrA.length

  if (arrB.length !== len) {
    return false
  }

  for (let i = 0; i < len; i++) {
    if (arrA[i] !== arrB[i]) {
      return false
    }
  }

  return true
}
