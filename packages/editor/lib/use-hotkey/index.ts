import isHotkey from "is-hotkey"
import { useEffect } from "react"

export function useHotkey(
  key: string,
  callback: () => void,
  deps: any[],
  isEnabled: () => boolean = () => true
) {
  const isKey = isHotkey(key)
  return useEffect(() => {
    if (!isEnabled()) return
    function keyDownHandler(e: KeyboardEvent) {
      if (isKey(e)) {
        e.preventDefault()
        e.stopPropagation()
        callback()
      }
    }
    document.addEventListener("keydown", keyDownHandler)
    return () => {
      document.removeEventListener("keydown", keyDownHandler)
    }
  }, deps)
}
