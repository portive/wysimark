import { Editor, Transforms } from "slate"

import { BetterAt, findElementUp } from "../../sink"
import { AnchorElement } from ".."

export function editLink(
  editor: Editor,
  { href, title }: { href: string; title?: string },
  { at }: { at?: BetterAt }
) {
  const link = findElementUp(editor, "anchor", { at })
  if (!link) return false
  Transforms.setNodes<AnchorElement>(editor, { href, title }, { at: link[1] })
  return true
}
