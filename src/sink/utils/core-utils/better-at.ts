import { Editor, Element, Location } from "slate"
import { ReactEditor } from "slate-react"

/**
 * Defines a value you'd find in a function's parameters as a replacement for
 * `at`. The benefit of using `BetterAt` is that it allows you to search
 * using an `Element`.
 */
export type BetterAt = Location | Element | null

/**
 * Takes a `BetterAt` type which can include an `Element` and returns a
 * Location.
 */
export function betterAt(editor: Editor, at: Location | Element): Location {
  if (!Element.isElement(at)) return at
  return ReactEditor.findPath(editor, at)
}
