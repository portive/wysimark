/**
 * exhaustiveness type check for switch or if/else statements
 * 
 * <https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript>
 */
export function assertUnreachable(x: never): never {
  console.error("This should be unreachable")
  console.log(x)
  throw new Error("This should be unreachable code")
}
