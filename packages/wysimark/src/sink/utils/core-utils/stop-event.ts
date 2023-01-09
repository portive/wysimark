/**
 * Tiny helper to call `e.preventDefault()` and `e.stopPropagation()` as the
 * same time.
 */
export function stopEvent(e: Event | React.SyntheticEvent) {
  e.preventDefault()
  e.stopPropagation()
}
