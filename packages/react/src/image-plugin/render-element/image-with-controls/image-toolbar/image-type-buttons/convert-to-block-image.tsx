import { Editor, Text, Transforms } from "slate"
import { ReactEditor } from "slate-react"

import { findElementUp } from "../../../../../sink"
import { ImageInlineElement } from "../../../../types"
import { resizeInPreset } from "../../../../utils"

export function convertToBlockImage(
  editor: Editor,
  element: ImageInlineElement
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
      name: "initial-block-image",
      title: "",
      type: "bounds",
      width: 320,
      height: 320,
    })
    /**
     * Convert the inline image to a block image.
     *
     * When we make this change, it causes the normalization rules to change
     * from the rules of an inline to the rules of a block. Inlines can only
     * co-exist with Text and other Inline elments. They must also always be
     * followed by and preceded by a Text nod.
     *
     * Some of the code below help to fix the inconsistencies caused by this
     * change.
     */
    Transforms.setNodes(
      editor,
      { type: "image-block", ...nextSize },
      { at: path }
    )
    /**
     * Here we find the enclosing parent block for the inline.
     *
     * Note that there should always be a parent block for an inline. If there
     * isn't, something isn't working properly because the Slate normalization
     * rules require a block parent to an inline.
     */
    const parentEntry = findElementUp(
      editor,
      (node) => Editor.isBlock(editor, node) && node.type !== "image-block"
    )
    if (!parentEntry) throw new Error("This shouldn't happen")
    const [parentElement, parentPath] = parentEntry
    const siblings = parentElement.children
    const siblingCount = parentElement.children.length
    const index = path.slice(-1)[0]

    /**
     * Before we lift the inline node, we want to remove **empty** Text blocks
     * at the beginning of the block when the inline node is the second item
     * and at the end of the block when the inline is the second to last item.
     *
     * We do this because Slate adds empty text nodes always at the beginning
     * and end of a line if the node next to it is an inline. This behavior
     * works fine in most cases, but when we want to lift the inline element
     * up, Slate sees that there is content next to it and when the element is
     * lifted up, the block is split into 3 pieces, including a piece with an
     * empty Text node.
     *
     * From a user expectation point of view though, we don't want these extra
     * blocks inserted. If the inline image is at the end of the line, we want
     * it converted to a block image with a block of stuff before it. There is
     * no use for the extra block at the end with no content in it.
     */
    /**
     * Remove the last sibling if it's empty and next to the inline image
     */
    const lastSibling = siblings[siblingCount - 1]
    if (
      index === siblingCount - 2 &&
      Text.isText(lastSibling) &&
      lastSibling.text === ""
    ) {
      Transforms.removeNodes(editor, {
        at: [...parentPath, siblingCount - 1],
      })
    }
    /**
     * Remove the first sibling if it's empty and next to the inline image
     */
    const firstSibling = siblings[0]
    const removeFirstSibling =
      index === 1 && Text.isText(firstSibling) && firstSibling.text === ""
    if (removeFirstSibling) {
      Transforms.removeNodes(editor, { at: [...parentPath, 0] })
    }
    /**
     * Now lift the node, but if the first sibling was removed, we need to account fo rthe fact that the index of the image changed.
     */
    Transforms.liftNodes(editor, {
      at: [...parentPath, removeFirstSibling ? index - 1 : index],
    })
  })
}
