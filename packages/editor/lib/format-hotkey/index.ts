import pull from "lodash/pull"
import { isMac } from "~/lib/is-mac"

/**
 * Character Reference
 *
 * Ctrl+P Ctrl+Shift+P Ctrl+Alt+P
 * ⌘P ⇧⌘P ⌥⌘P
 */

const UNICODE_CMD = "\u2318"
const UNICODE_CTRL = "\u2303"
const UNICODE_SHIFT = "⇧"
const UNICODE_OPT = "⌥"
const UNICODE_ENTER = "⏎"

const MAC_KEYS = {
  alt: UNICODE_OPT,
  ctrl: UNICODE_CTRL,
  opt: UNICODE_OPT,
  shift: UNICODE_SHIFT,
  mod: UNICODE_CMD,
  cmd: UNICODE_CMD,
  enter: UNICODE_ENTER,
  super: `${UNICODE_OPT}${UNICODE_CMD}`,
}

const PC_KEYS = {
  alt: "ALT",
  ctrl: "CTRL",
  opt: "ALT",
  shift: "SHIFT",
  mod: "CTRL",
  cmd: "CTRL",
  enter: UNICODE_ENTER,
  super: "CTRL+SHIFT",
}

function formatMac(segments: string[]) {
  const result = []
  Object.entries(MAC_KEYS).forEach(([key, symbol]) => {
    if (segments.includes(key)) {
      result.push(symbol)
      pull(segments, key)
    }
  })
  result.push(...segments.map((s) => s.toUpperCase()))
  return result.join("")
}

function formatPC(segments: string[]) {
  const result = []
  Object.entries(PC_KEYS).forEach(([key, symbol]) => {
    if (segments.includes(key)) {
      result.push(symbol)
      pull(segments, key)
    }
  })
  result.push(...segments.map((s) => s.toUpperCase()))
  return result.join("+")
}

function formatHotkey(shortcut: string) {
  const segments = shortcut.toLowerCase().split("+")
  if (isMac()) {
    return formatMac(segments)
  } else {
    return formatPC(segments)
  }
}

export { formatHotkey }
