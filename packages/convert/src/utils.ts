export function assertUnreachable(x: never): never {
  throw new Error(
    `Didn't expect to get here with value ${JSON.stringify(x, null, 2)}`
  )
}
