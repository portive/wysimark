const IS_MAC_REGEX = /mac os x/i

let isMacValue: boolean | undefined = undefined

/**
 * `isMac` is a function and not a const because `window.navigator` only exists
 * on the browser and will throw an Error on the server.
 */
export function isMac() {
  /**
   * Memoized for performance
   */
  if (isMacValue !== undefined) return isMacValue
  const { userAgent } = window.navigator
  isMacValue = IS_MAC_REGEX.test(userAgent)
  return isMacValue
}
