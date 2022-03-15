export function stopEvent(event: {
  preventDefault: () => void
  stopPropagation: () => void
}) {
  event.preventDefault()
  event.stopPropagation()
}
