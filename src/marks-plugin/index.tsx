import { clsx } from "clsx"
import { isHotkey, isKeyHotkey, toKeyCode, toKeyName } from "is-hotkey"
import React from "react"
import { Editor, Element, Point, Range, Text, Transforms } from "slate"

import {
  createHotkeyHandler,
  createPlugin,
  curryOne,
  findElementUp,
  stopEvent,
} from "~/src/sink"

import { insertText } from "./editor/insert-text"
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
    // const originalInsertText = editor.insertText
    // editor.insertText = (text) => {
    //   console.log("tirggered")
    //   if (text === "*") {
    //     return
    //   }
    //   originalInsertText(text)
    // }
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
      editor: {
        insertText: curryOne(insertText, editor),
      },
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
          // if (
          //   autocompleteMarker(editor, e, {
          //     triggerMarker: "`",
          //     regexp: /([`])(\S.*?)([`])$/,
          //     mark: "code",
          //   })
          // ) {
          //   return true
          // }
          // if (
          //   autocompleteMarker(editor, e, {
          //     triggerMarker: "*",
          //     regexp: /([*])(.+?)([*])$/,
          //     mark: "italic",
          //   })
          // ) {
          //   return true
          // }
          return false
        },
      },
    }
  })

function autocompleteMarker(
  editor: Editor,
  e: React.KeyboardEvent<HTMLDivElement>,
  {
    triggerMarker,
    regexp,
    mark,
  }: { triggerMarker: string; regexp: RegExp; mark: keyof Text }
): boolean {
  /**
   * Make sure theere is a selection and it's collapsed
   */
  console.log(
    { triggerMarker, mark },
    e.key,
    e.which,
    toKeyCode("*"),
    toKeyName("*"),
    isHotkey("*", { byKey: true })(e.nativeEvent)
  )
  if (editor.selection === null) return false
  if (Range.isExpanded(editor.selection)) return false
  /**
   * WHAT I'M WORKING ON:
   *
   * So, basically, `is-hotkey` doesn't work with an asterisk. We need to find
   * an alternate way of testing but it's a little tricky and there are a few
   * approaches we can take:
   *
   * - The first approach is to write our own key checker, but be careful
   *   because we want to make sure we aren't interception hotkeys with modifier
   *   keys for example. Like CMD+OPTION+8 should not trigger the `*` trigger.
   *
   * - NOTE: tested and paste does not trigger insertText. The second approach
   *   is to tie into `insertText` instead. This may be a more reliable method
   *   but we also need to at least think about whether insertText gets
   *   triggered during a paste event, for example, and if it does, that would
   *   be weird to have that suddenly bold some text.
   *
   */
  // if (isHotkey(triggerMarker, e.nativeEvent)) {
  if (isHotkey(triggerMarker, e.nativeEvent)) {
    console.log("triggered")
    stopEvent(e)
    const markerText = triggerMarker
    Transforms.insertText(editor, markerText)
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
    if (blockEntry == null) return true

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
    const match = text.match(regexp)
    if (match == null) return true
    if (match.length !== 4)
      throw new Error(
        `Expected the RegExp to have 3 grouped subexpressions but returned ${
          match.length - 1
        }`
      )

    /**
     * Delete the closing markers
     */
    const closingMarkersRange = getRangeBackwards(
      editor,
      editor.selection.focus,
      match[3].length
    )
    Transforms.delete(editor, { at: closingMarkersRange })

    /**
     * Delete the opening markers
     */
    const openingMarkersRange = getRangeBackwards(
      editor,
      editor.selection.focus,
      match[2].length + match[3].length,
      match[2].length
    )
    Transforms.delete(editor, { at: openingMarkersRange })

    /**
     * Create a range that represents the selected text
     */
    const matchRange = getRangeBackwards(
      editor,
      editor.selection.focus,
      match[2].length
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
    editor.marksPlugin.toggleMark(mark, undefined, { at: matchRange })

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
