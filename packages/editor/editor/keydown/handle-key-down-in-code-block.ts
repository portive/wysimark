import isHotkey from "is-hotkey"
import React from "react"
import { Editor, Node, NodeEntry, Transforms } from "slate"
import { CodeLineElement } from "~/editor/types"
import { countLeadingSpaces, isFocusInside } from "~/editor/utils"
import { getElementsByType } from "../custom"

const isTab = isHotkey("tab")
const isShiftTab = isHotkey("shift+tab")

/**
 * If we are in a code-block, we handle `tab` and `shift+tab` which indents
 * and outdents code by 2 spaces.
 */
export const handleKeyDownInCodeBlock = (
  e: React.KeyboardEvent,
  editor: Editor
): boolean => {
  if (!isFocusInside(editor, "code-block")) {
    return false
  }
  if (isTab(e.nativeEvent)) {
    e.preventDefault()
    e.stopPropagation()
    const codeLines = getElementsByType(editor, "code-line")
    /**
     * Insert two spaces at the beginning of each line
     */
    for (const [, path] of codeLines) {
      Transforms.insertText(editor, "  ", {
        at: { path: [...path, 0], offset: 0 },
      })
    }
    return true
  }
  if (isShiftTab(e.nativeEvent)) {
    e.preventDefault()
    e.stopPropagation()
    const codeLines = getElementsByType(editor, "code-line")

    /**
     * If there are any lines with less than 2 leading spaces, we abort
     * because we can't outdent.
     */
    if (!canOutdent(codeLines)) return true

    /**
     * Remove the first two spaces of each line
     */
    for (const [, path] of codeLines) {
      Transforms.delete(editor, {
        unit: "character",
        distance: 2,
        at: {
          path: [...path, 0],
          offset: 0,
        },
      })
    }
    return true
  }
  return false
}

/**
 * Tells us if the codeLines passed in can be outdented. They can be outdented
 * if every line has at least two leading spaces.
 */
function canOutdent(codeLines: NodeEntry<CodeLineElement>[]) {
  if (codeLines.length === 0) return false
  for (const [node] of codeLines) {
    const leadingSpaces = countLeadingSpaces(Node.string(node))
    if (leadingSpaces < 2) return false
  }
  return true
}
