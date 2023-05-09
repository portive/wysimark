import { Editor, Transforms } from "slate"
import { ReactEditor } from "slate-react"

import { ImageBlockElement } from "../../../../types"
import { resizeInPreset } from "../../../../utils"

export function convertToInlineImage(
  editor: Editor,
  element: ImageBlockElement
) {
  /**
   * TODO:
   *
   * This should be handled or thought about better. Like maybe if these
   * values don't exist, we still change the type.
   */
  if (
    !element.width ||
    !element.height ||
    !element.srcWidth ||
    !element.srcHeight
  )
    return
  const size = { width: element.width, height: element.height }
  const srcSize = { width: element.srcWidth, height: element.srcHeight }
  const path = ReactEditor.findPath(editor, element)
  Editor.withoutNormalizing(editor, () => {
    /**
     * TODO:
     *
     * `resizeInPreset` should probably be renamed to something like
     * `resizeIn` which can be used more generically. Perhaps it takes the
     * `type`, `width` and `height` as an Interface making it compatible with
     * a Preset which would extend it.
     */
    const nextSize = resizeInPreset(size, srcSize, {
      name: "initial-inline-image",
      title: "",
      type: "bounds",
      width: 24,
      height: 24,
    })
    Transforms.setNodes(
      editor,
      { type: "image-inline", ...nextSize },
      { at: path }
    )
    Transforms.wrapNodes(
      editor,
      { type: "paragraph", children: [] },
      { at: path }
    )
  })
}
