import { clsx } from "clsx"
import isHotkey from "is-hotkey"
import React from "react"
import { Editor, Element, Point, Range, Transforms } from "slate"
import { HistoryEditor } from "slate-history"

import {
  createHotkeyHandler,
  createPlugin,
  findElementUp,
  stopEvent,
} from "~/src/sink"

import { createMarksMethods } from "./methods"
import { $MarksSpan } from "./styles"

export type MarksEditor = {
  /**
   * IMPORTANT:
   *
   * This cannot be named `marks` because it conflicts with the `editor.marks`
   * built into the BaseEditor.j
   */
  marksPlugin: ReturnType<typeof createMarksMethods>
}

export type MarksText = {
  text: string
  bold?: true
  italic?: true
  underline?: true
  sup?: true
  sub?: true
  strike?: true
}

export type MarksPluginCustomTypes = {
  Name: "marks"
  Editor: MarksEditor
  Text: MarksText
}

export const MarksPlugin = () =>
  createPlugin<MarksPluginCustomTypes>((editor) => {
    editor.marksPlugin = createMarksMethods(editor)
    const hotkeyHandler = createHotkeyHandler({
      "mod+b": editor.marksPlugin.toggleBold,
      "mod+i": editor.marksPlugin.toggleItalic,
      "mod+u": editor.marksPlugin.toggleUnderline,
      "super+p": editor.marksPlugin.toggleSup,
      "super+b": editor.marksPlugin.toggleSub,
      "super+k": editor.marksPlugin.toggleStrike,
    })
    return {
      name: "marks",
      editableProps: {
        renderLeaf: ({ leaf, children }) => {
          return (
            <$MarksSpan
              className={clsx({
                "--bold": leaf.bold,
                "--italic": leaf.italic,
                "--underline": leaf.underline,
                "--sup": leaf.sup,
                "--sub": leaf.sub,
                "--strike": leaf.strike,
              })}
            >
              {children}
            </$MarksSpan>
          )
        },
        onKeyDown: (e) => {
          if (hotkeyHandler(e)) return true
          return autocompleteBold(editor, e)
          // return false
        },
      },
    }
  })

const isBacktick = isHotkey("`")

function autocompleteBold(
  editor: Editor,
  e: React.KeyboardEvent<HTMLDivElement>
): boolean {
  /**
   * Make sure theere is a selection and it's collapsed
   */
  if (editor.selection === null) return false
  if (Range.isExpanded(editor.selection)) return false
  if (isBacktick(e)) {
    stopEvent(e)
    Transforms.insertText(editor, "`")
    const { selection } = editor

    /**
     * Make sure we are in a block that is not void.
     */
    const blockEntry = findElementUp(
      editor,
      (node) =>
        Element.isElement(node) &&
        !Editor.isVoid(editor, node) &&
        Editor.isBlock(editor, node)
    )
    if (blockEntry == null) return false

    /**
     * Grab all the text from the beginning of the block until now
     */
    const range = {
      anchor: Editor.start(editor, blockEntry[1]),
      focus: selection.focus,
    }
    const text = Editor.string(editor, range)

    /**
     * See if the text matches our pattern
     */
    const regexp = /([`]\S.*?)$/
    const matchWithStartingBacktick = text.match(regexp)
    if (matchWithStartingBacktick == null) return false

    /**
     * Create a range that represents the selected text
     */
    const matchLength = matchWithStartingBacktick[0].length
    // const endPoint = selection.focus
    // const startPoint = Editor.before(editor, endPoint, {
    //   unit: "character",
    //   distance: matchLength,
    // })
    // if (!startPoint) throw new Error("This shouldn't happen")
    // const matchRange: Range = { anchor: startPoint, focus: endPoint }
    const lastBackTickRange = getRangeBackwards(
      editor,
      editor.selection.focus,
      1
    )
    Transforms.delete(editor, { at: lastBackTickRange })
    const firstBackTickRange = getRangeBackwards(
      editor,
      editor.selection.focus,
      matchLength - 1,
      matchLength - 2
    )
    Transforms.delete(editor, { at: firstBackTickRange })
    const matchRange = getRangeBackwards(
      editor,
      editor.selection.focus,
      matchLength - 2
    )

    /**
     * Feels like `withoutMerging` should work but if we undo twice after this,
     * causes a crash.
     *
     * This looks like a good solution that isn't in main
     * https://github.com/ianstormtaylor/slate/issues/3874
     *
     * NOTE:
     *
     * Manually calling `editor.onChange()` won't work
     *
     * An appropriate starting point for searching more in issues
     * https://github.com/ianstormtaylor/slate/issues?q=is%3Aissue+withoutMerging+is%3Aclosed
     */
    editor.marksPlugin.toggleMark("code", undefined, { at: matchRange })

    return true
  }
  return false
}

function getRangeBackwards(
  editor: Editor,
  point: Point,
  startDistance: number,
  endDistance?: number
) {
  const startPoint = Editor.before(editor, point, {
    unit: "character",
    distance: startDistance,
  })
  const endPoint =
    endDistance === undefined
      ? point
      : Editor.before(editor, point, {
          unit: "character",
          distance: endDistance,
        })
  if (!startPoint)
    throw new Error(
      `startPoint not found. The distance backward from the point may be invalid.`
    )
  if (!endPoint)
    throw new Error(
      `endPoint not found. The distance backward from the point may be invalid.`
    )
  return {
    anchor: startPoint,
    focus: endPoint,
  }
}
