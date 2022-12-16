import { Editor, Element, Location } from "slate"
import { ReactEditor } from "slate-react"

/**
 * We are able to match a `Location`, an `Element` or a `Selection` which
 * could return `null`
 */

export type BetterAt = Location | Element | null
export function betterAt(editor: Editor, at: Location | Element) {
  if (!Element.isElement(at)) return at
  return ReactEditor.findPath(editor, at)
}
