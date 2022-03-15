import copyToClipboard from "copy-to-clipboard"
import React, { useCallback, useRef, useState } from "react"
import { Editor, Element, Point, Range } from "slate"
import {
  ReactEditor,
  useFocused,
  useSelected,
  useSlateStatic,
} from "slate-react"
import { LinkPopup } from "./link/link-popup"
import { CustomRenderElementProps } from "./utils"

/**
 * Link
 */
export function Link({
  attributes,
  children,
  element,
}: CustomRenderElementProps<"link">) {
  /**
   * Used for positioning the Dialog.
   */
  const linkRef = useRef<HTMLAnchorElement>(null)
  const editor = useSlateStatic()
  const selected = useSelected()
  const focused = useFocused()

  const highlighted = selected && focused

  /**
   * We add an `isCopying` state because `copyToClipboard` requires a loss of
   * focus to start. When the loss of focus happens, `highlighted` is no
   * longer true and the `<LinkDialog>` will flicker.
   *
   * By setting `isCopying` to true during the copyToClipboard, we can make
   * sure that the `<LinkDialog>` stays visible.
   */
  const [isCopying, setIsCopying] = useState(false)
  const isPopupVisible =
    isCopying ||
    (highlighted && checkIsPopupVisible(editor, element, highlighted))

  const copy = useCallback(() => {
    setIsCopying(true)
    copyToClipboard(element.url)
    setTimeout(() => {
      setIsCopying(false)
    })
  }, [])

  return (
    <a {...attributes} href={element.url} ref={linkRef}>
      {isPopupVisible ? (
        <LinkPopup linkRef={linkRef} element={element} copy={copy} />
      ) : null}
      {children}
    </a>
  )
}

/**
 * Checks to see if the popup is visible.
 *
 * It is visible if the selection is fully inside of the element. If part of
 * the selection is outside, we don't show the popup.
 */
function checkIsPopupVisible(
  editor: Editor,
  element: Element,
  highlighted: boolean
): boolean {
  if (!highlighted) return false
  if (!editor.selection) return false
  const elementPath = ReactEditor.findPath(editor, element)
  /**
   * This trickiness in the code is how we find whether the element range includes
   * the selection. A few notes:
   *
   * - `Range.includes` does not do what it sounds like. It returns true if there
   *   is an intersection.
   * - We compare the points of the start and end instead of the Range because
   *   the `Range.equals` method only returns true if the range is in the same
   *   direction. We don't care about the direction.
   */
  const elementRange = Editor.range(editor, elementPath)
  const intersection = Range.intersection(editor.selection, elementRange)
  if (!intersection) return false
  return (
    Point.equals(Range.start(editor.selection), Range.start(intersection)) &&
    Point.equals(Range.end(editor.selection), Range.end(intersection))
  )
}
