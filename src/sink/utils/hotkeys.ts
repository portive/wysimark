import { isHotkey } from "is-hotkey"

import { isMac } from "./is-mac"

export function isBetterHotkey(hotkey: string) {
  const modifiedHotkey = hotkey.replace(
    /\bsuper\b/g,
    isMac() ? "cmd+alt" : "ctrl+shift"
  )
  return isHotkey(modifiedHotkey)
}

type KeyboardAction = () => boolean | void

type IsKeyboardShortcut = (event: KeyboardEvent) => boolean

type ShortcutTuple = [IsKeyboardShortcut, KeyboardAction]

/**
 * Creates a `keyDown` handler from an object where the keys are the shortcut
 * and the values are the `KeyboardAction` function to execute. If the
 * function returns `true`, the event is considered handled and the event
 * is stopped.
 *
 * In some situations, we don't want the event to be stopped.
 *
 * For example, hitting `up` or `down` in a table, starts a `setTimeout` but
 * we want the original keyboard event to be handled by the browser.
 */

export function createHotkeyHandler(
  shortcutsObject: Record<string, KeyboardAction>
) {
  /**
   * Don't populate the shortcuts at this point because it will run on the
   * server. We can't run it on the server because we need to determine if we
   * are on Mac or Windows and checking `window.navigate.userAgent` will cause
   * a failure.
   */
  let shortcuts: ShortcutTuple[] | null = null

  return function handleShortcuts(
    event: React.SyntheticEvent<Element, KeyboardEvent>
  ) {
    /**
     * We initialize shortcuts once on first usage.
     */
    if (shortcuts == null) {
      shortcuts = Object.entries(shortcutsObject).map(([shortcut, fn]) => [
        isBetterHotkey(shortcut),
        fn,
      ])
    }
    for (const [isShortcut, action] of shortcuts) {
      if (isShortcut(event.nativeEvent)) {
        /**
         * If the keyboardAction returns true then the event has been handled.
         * We can stop the event at this point and exit the loop.
         */
        const response = action()
        if (response === true || response === undefined) {
          event.preventDefault()
          event.stopPropagation()
          return true
        }
      }
    }
    return false
  }
}
