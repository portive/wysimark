import { Editor, Element } from "slate"
import { ConvertibleBlockElement, isConvertibleBlockElement } from "../../types"
import { setConvertibleElement, setParagraph } from "../convertible"
export * from "./tab-in-list"

/**
 * https://fettblog.eu/typescript-hasownproperty/
 *
 * A version of `hasOwnProperty` that correctly does type narrowing.
 */
function hasOwnProperty<
  X extends Record<string, unknown>,
  Y extends PropertyKey
>(obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

/**
 * Returns true if all selected blocks that are convertible match the passed
 * in convertible type.
 **/
function isSelectedConvertibleTypesAllMatch(
  editor: Editor,
  convertibleType: ConvertibleBlockElement["type"]
) {
  if (editor.selection == null) return false
  const matches = Array.from(
    Editor.nodes<Element>(editor, {
      at: editor.selection,
      match: isConvertibleBlockElement,
    })
  )
  for (const [node] of matches) {
    if (node.type !== convertibleType) {
      return false
    }
  }
  return true
}

/**
 * Set list item type keeping in mind the special attributes of ordered
 * list items and task list items.
 */
export function toggleListItem(
  editor: Editor,
  targetType: "ordered-list-item" | "unordered-list-item" | "task-list-item"
) {
  if (editor.selection == null) return
  const isAllConvertibleElementsMatch = isSelectedConvertibleTypesAllMatch(
    editor,
    targetType
  )
  if (isAllConvertibleElementsMatch) {
    setParagraph(editor)
    return
  } else {
    switch (targetType) {
      case "unordered-list-item":
        setConvertibleElement(editor, (node: ConvertibleBlockElement) => ({
          type: "unordered-list-item",
          depth: hasOwnProperty(node, "depth") ? node.depth : 0,
        }))
        break
      case "ordered-list-item":
        setConvertibleElement(editor, (node: ConvertibleBlockElement) => ({
          type: "ordered-list-item",
          depth: hasOwnProperty(node, "depth") ? node.depth : 0,
          number: null,
        }))
        break
      case "task-list-item":
        setConvertibleElement(editor, (node: ConvertibleBlockElement) => ({
          type: "task-list-item",
          depth: hasOwnProperty(node, "depth") ? node.depth : 0,
          checked: hasOwnProperty(node, "checked") ? node.checked : false,
        }))
        break
    }
  }
}
