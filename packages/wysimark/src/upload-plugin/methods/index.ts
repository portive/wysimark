import { Editor, Element } from "slate"
import { RequireExactlyOne } from "type-fest"

import { curryOne } from "~/src/sink"

import { setElementTimeTraveling } from "./setElementTimeTraveling"
import { upload } from "./upload"

export function createUploadMethods(editor: Editor) {
  return {
    upload: curryOne(upload, editor),
    setElementTimeTraveling: <T extends Element, K extends keyof T = keyof T>(
      prev: RequireExactlyOne<T, K>,
      next: RequireExactlyOne<T, K>
    ) => setElementTimeTraveling(editor, prev, next),
  }
}
