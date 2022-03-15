export function assertDefined<T>(
  x: T,
  varName = "value"
): asserts x is NonNullable<T> {
  if (x === undefined) {
    throw new Error(`Expected ${varName} to be defined`)
  }
}
