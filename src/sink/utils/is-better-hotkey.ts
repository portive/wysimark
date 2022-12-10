import { isHotkey } from "is-hotkey"

import { isMac } from "./is-mac"

export function isBetterHotkey(hotkey: string) {
  const modifiedHotkey = hotkey.replace(
    /\bsuper\b/g,
    isMac() ? "cmd+alt" : "ctrl+shift"
  )
  return isHotkey(modifiedHotkey)
}
