import isHotkey from "is-hotkey"
import { isMac } from "~/lib/is-mac"

export function isHotkeyPlus(hotkey: string) {
  const modifiedHotkey = hotkey.replace(
    /\bsuper\b/g,
    isMac() ? "cmd+alt" : "ctrl+shift"
  )
  return isHotkey(modifiedHotkey)
}
