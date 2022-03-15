import isHotkey from "is-hotkey"
import { Editor, Element, Path, Range, Transforms } from "slate"
import { createTable } from "../table"

const isEnter = isHotkey("enter")

type NodeFromMatchDataFn = (matchData: string[], editor: Editor) => Element

// Array<[RegExp, NodeFromMatchDataFn]>
const completions: Array<{
  regexp: RegExp
  createBlockFn: NodeFromMatchDataFn
  pathTail: Path
}> = [
  /**
   * Autocomplete Code blocks
   */
  {
    regexp: /^```([a-z]+)?$/i,
    createBlockFn: (): Element => {
      return {
        type: "code-block",
        language: "text",
        children: [{ type: "code-line", children: [{ text: "" }] }],
      }
    },
    pathTail: [0, 0],
  },
  /**
   * Autocomplete Tables
   */
  {
    regexp: /^\|(\|+)$/i,
    createBlockFn: (matchData: string[]): Element => {
      const columnCount = matchData[1].length
      const table = createTable(columnCount, 2)
      return table
    },
    pathTail: [0, 0, 0],
  },
  /**
   * Autocomplete Horizontal Rules
   */
  {
    regexp: /^---+$/i,
    createBlockFn: (): Element => {
      return {
        type: "hr",
        children: [{ text: "" }],
      }
    },
    pathTail: [],
  },
]

export function handleKeyDownEnterAutocomplete(
  event: React.KeyboardEvent,
  editor: Editor
) {
  if (!isEnter(event.nativeEvent)) return false
  const { selection } = editor
  if (selection === null) return false
  if (Range.isExpanded(selection)) return false

  const { anchor } = selection
  const block = Editor.above(editor, {
    match: (n) => Editor.isBlock(editor, n),
  })
  const path = block ? block[1] : []
  const start = Editor.start(editor, path)
  const range = { anchor, focus: start }
  const beforeText = Editor.string(editor, range)
  for (const { regexp, createBlockFn, pathTail } of completions) {
    const matchData = beforeText.match(regexp)
    if (matchData) {
      event.preventDefault()
      event.stopPropagation()
      const blockToInsert = createBlockFn(matchData as string[], editor)
      const isVoid = editor.isVoid(blockToInsert)
      Transforms.removeNodes(editor, { at: path })
      Transforms.insertNodes(editor, blockToInsert, { at: path })
      if (!isVoid) {
        const selectionPath = [...path, ...pathTail]
        setTimeout(() => {
          Transforms.setSelection(editor, {
            anchor: { path: selectionPath, offset: 0 },
            focus: { path: selectionPath, offset: 0 },
          })
        }, 0)
      } else {
        const nextBlockPath = [path[0] + 1]
        Transforms.insertNodes(
          editor,
          { type: "p", children: [{ text: "" }] },
          { at: nextBlockPath }
        )
        const selectionPath = [...nextBlockPath, 0]
        setTimeout(() => {
          Transforms.setSelection(editor, {
            anchor: { path: selectionPath, offset: 0 },
            focus: { path: selectionPath, offset: 0 },
          })
        })
      }
      return true
    }
  }
  return false
}
