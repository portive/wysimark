import { Editor, Transforms } from "slate"

import { BetterAt, findElementUp } from "../../sink"

export function removeLink(editor: Editor, { at }: { at?: BetterAt }) {
  const link = findElementUp(editor, "anchor", { at })
  if (!link) return false
  Transforms.unwrapNodes(editor, { at: link[1] })
  return true
}
