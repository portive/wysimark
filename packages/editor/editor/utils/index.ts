import { Editor, Element } from "slate"

/**
 * Take a union type and narrows it using a discriminant.
 *
 * <https://basarat.gitbook.io/typescript/type-system/discriminated-unions>
 *
 * A common use case is that T would be a union of several object types with a
 * discriminant property like `type`.
 *
 * N would be the discriminant which you would narrow `T` with like
 * `{type: "paragraph"}`.
 */
export type Narrow<T, N> = T extends N ? T : never

/**
 * Returns true if the `focus` of the selection is inside the given element
 * type.
 *
 * Note:
 * `Editor.above` returns `undefined`, erroneously in my opinion, if we try
 * to match based on a range, even if `match` returns `true`.
 *
 * Because of this, we elect to only check the `focus`.
 *
 * This may cause unexpected because which side is in the element type matters.
 *
 * That said, pragmatically, both are unusual behaviors from the perspective
 * of the user and should both be considered edge cases. For this reason,
 * we just make a choice.
 */
export function isFocusInside(editor: Editor, type: Element["type"]): boolean {
  if (editor.selection == null) return false
  const above = Editor.above(editor, {
    at: editor.selection.focus,
    match: (n) => {
      return Element.isElement(n) && n.type === type
    },
  })
  return !!above
}

/**
 * Takes a string and returns the number of leading spaces
 *
 * <https://stackoverflow.com/questions/25823914/javascript-count-spaces-before-first-character-of-a-string>
 */
export function countLeadingSpaces(s: string): number {
  return s.search(/[^ ]|$/)
}
