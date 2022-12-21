export function stopEvent(e: Event | React.SyntheticEvent) {
  e.preventDefault()
  e.stopPropagation()
}
