import { isMac } from "~/src/sink"

/**
 * Character Reference
 *
 * Ctrl+P Ctrl+Shift+P Ctrl+Alt+P
 * ⌘P ⇧⌘P ⌥⌘P
 */

export const key = {
  cmd: "\u2318",
  ctrl: "\u2303",
  shift: "⇧",
  opt: "⌥",
  enter: "⏎",
}

const MAC_KEYS = {
  shift: key.shift,
  opt: key.opt,
  alt: key.opt,
  ctrl: key.ctrl,
  mod: key.cmd,
  cmd: key.cmd,
  enter: key.enter,
  super: `${key.opt}${key.cmd}`,
}

const PC_KEYS = {
  alt: "ALT",
  ctrl: "CTRL",
  opt: "ALT",
  shift: "SHIFT",
  mod: "CTRL",
  cmd: "CTRL",
  enter: key.enter,
  super: "CTRL+SHIFT",
}

function pull<T>(arr: T[], value: T): void {
  const index: number = arr.findIndex((el: T) => el === value)
  if (index !== -1) {
    arr.splice(index, 1)
  }
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

export function formatHotkey(shortcut: string) {
  const segments = shortcut.toLowerCase().split("+")
  if (isMac()) {
    return formatMac(segments)
  } else {
    return formatPC(segments)
  }
}
