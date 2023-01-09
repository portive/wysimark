import { Editor, Point } from "slate"

/**
 * This utility function which is designed specifically to its usage in
 * `autocompleteMark` (and hence probably shouldn't be reused) takes a Point and
 * then two distances (second one is optional), measured in `character`, before
 * the Point.
 *
 * It then returns a range before the `startDistance` and the `endDistance`.
 *
 * TODO: BUG:
 *
 * Our `match` returns the distance in `bytes` and not `characters` so we get
 * the wrong offsets, for example, when bolding a Unicode Emoji.
 *
 * We should be using Slate's internal `getCharacterDistance` but it is not
 * exposed.
 */
export function getRangeBackwards(
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
