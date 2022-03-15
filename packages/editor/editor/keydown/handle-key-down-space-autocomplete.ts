import isHotkey from "is-hotkey"
import { Editor, Element, Range, Transforms } from "slate"

const isSpace = isHotkey("space")

const UnorderedListItem = (): ElementConverter => {
  return (node: Element) => ({
    type: "unordered-list-item",
    level: null,
    depth: "depth" in node ? node.depth : 0,
    checked: null,
  })
}

const OrderedListItem = (): ElementConverter => {
  return (node: Element) => ({
    type: "ordered-list-item",
    level: null,
    depth: "depth" in node ? node.depth : 0,
    checked: null,
  })
}

const TaskListItem = (checked: boolean): ElementConverter => {
  return (node: Element) => ({
    type: "task-list-item",
    level: null,
    depth: "depth" in node ? node.depth : 0,
    checked,
  })
}

const Heading = (level: number): ElementConverter => {
  return () => ({
    type: "heading",
    level,
    depth: null,
    checked: null,
  })
}

type ConverterReturn = Partial<
  Omit<Element, "depth" | "checked"> & {
    depth: number | null
    checked: boolean | null
  }
>

type ElementConverter = (element: Element) => ConverterReturn

const AUTOCOMPLETE = {
  "*": UnorderedListItem(),
  "-": UnorderedListItem(),
  "+": UnorderedListItem(),
  "1.": OrderedListItem(),
  o: TaskListItem(false),
  x: TaskListItem(true),
  "[]": TaskListItem(false),
  "[ ]": TaskListItem(false),
  "[x]": TaskListItem(true),
  "#": Heading(1),
  "##": Heading(2),
  "###": Heading(3),
  "####": Heading(4),
  "#####": Heading(5),
  "######": Heading(6),
} as Record<string, ElementConverter>

export function handleKeyDownSpaceAutocomplete(
  event: React.KeyboardEvent,
  editor: Editor
) {
  if (!isSpace(event.nativeEvent)) return false
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
  const props = AUTOCOMPLETE[beforeText]

  if (props == null) return false

  event.preventDefault()
  event.stopPropagation()
  Transforms.select(editor, range)
  Transforms.delete(editor)
  Transforms.select(editor, start)
  /**
   * We know the return type will be an Element
   */
  const [[node, pos]] = Editor.nodes<Element>(editor, {
    match: (n) => Editor.isBlock(editor, n),
  })
  /**
   * We type the return here as our original type definition allows us to
   * include `null` to unset certain values. This is valid in `setNodes`
   */
  const nextProps = props(node) as Partial<Element>
  Transforms.setNodes(editor, nextProps, { at: pos })
  return true
}
