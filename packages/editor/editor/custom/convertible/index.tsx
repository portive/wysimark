import { Editor, Element, Path, Range, Transforms } from "slate"
import {
  ConvertibleBlockElement,
  HeadingElement,
  isConvertibleBlockElement,
} from "../../types"
import { getNodeEntries } from "../util"

/**
 * The list of all property keys other than `type` that need to be removed
 * if they aren't specified in a convertible element.
 *
 * For example, if we have a bulleted list, it has a `depth`. We need to make
 * sure that `number`, `checked` and `level` are removed before converting
 * to a bulleted list.
 */
const CONVERTIBLE_PROP_KEYS = ["depth", "number", "checked", "level"]

/**
 * Sets all convertible elements (ie. paragraphs, heading and lists) so that
 *
 * - All of the convertible elements in selection are converted to given type
 * - None of the non-convertible elements are converted
 * - Unused properties like a `checked` property in a `paragraph` are removed
 */
export function setConvertibleElement(
  editor: Editor,
  getConvertibleElementProps: (
    element: ConvertibleBlockElement
  ) => Omit<ConvertibleBlockElement, "type" | "children">,
  at?: Path | Range
) {
  if (at == null) {
    if (editor.selection == null) return
    at = editor.selection
  }

  // if (editor.selection == null) return
  const matches = Editor.nodes<ConvertibleBlockElement>(editor, {
    at,
    match: isConvertibleBlockElement,
  })
  for (const [node, pos] of matches) {
    const convertibleElementProps = getConvertibleElementProps(node)
    Transforms.setNodes(editor, convertibleElementProps, { at: pos })
    const propKeysInElement = Object.keys(convertibleElementProps)
    const propKeysToRemove = CONVERTIBLE_PROP_KEYS.filter(
      (k) => !propKeysInElement.includes(k)
    )
    Transforms.unsetNodes(editor, propKeysToRemove, { at: pos })
  }
}

export function setParagraph(editor: Editor) {
  setConvertibleElement(editor, () => ({
    type: "p",
  }))
}

/**
 * Toggle a heading. If it's not a heading or it's a heading but not at the
 * same level, then toggle to the heading at the given level. If it's
 * already a heading at the given level, then toggle to a paragraph.
 */
export function toggleHeading(editor: Editor, level: HeadingElement["level"]) {
  const textBlockPairs = getNodeEntries(editor, isConvertibleBlockElement)
  const isAllSameHeadingLevel = textBlockPairs.every(
    ([block]) =>
      Element.isElement(block) &&
      block.type == "heading" &&
      block.level === level
  )
  if (isAllSameHeadingLevel) {
    setParagraph(editor)
  } else {
    setConvertibleElement(editor, () => ({
      type: "heading",
      level,
    }))
  }
}
