export function diff(x: number, y: number): number {
  if (x < 0 && y > 0) {
    return y - x
  }

  if (x > 0 && y < 0) {
    return x - y
  }

  if (x < 0 && y < 0) {
    if (x > y) {
      return (y - x) * -1
    }

    return (x - y) * -1
  }

  if (x > y) {
    return x - y
  }

  return y - x
}
