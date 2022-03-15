import cx from "classnames"
import React, { useCallback } from "react"
import { ReactEditor, useSlate } from "slate-react"
import { ModalType, useModal } from "~/lib/modal"
import { onDrop } from "../data-transfer/on-drop"
import { onPaste } from "../data-transfer/on-paste"
import { onKeyDown } from "../keydown"
import { renderElement } from "../render/render-element"
import { renderLeaf } from "../render/render-leaf"
import { decorate } from "./decorate"
import { $Editable } from "./styled-editable"

/**
 * Returns an `Editable` customized with:
 *
 * - Emotion styling
 * - Event handlers
 * - Renderers
 */
export function CustomEditable({
  "data-cy": dataCy,
  readOnly,
  className: classNameProp,
  onBlur,
}: {
  "data-cy"?: string
  readOnly: boolean
  className?: string
  onBlur?: React.FocusEventHandler
}) {
  const editor = useSlate()

  /**
   * Adding these props to `editor` makes them available wherever `editor` is
   * available. This won't affect or cause any renders if the value changes
   * here.
   *
   * That gets handled by the `onRenderElement` and `onRenderLeaf` methods.
   */
  editor.modalDialog = useModal(ModalType.Dialog)

  // TODO: iPhone may require useLockBodyScroll
  // if (isAppleIphone()) {
  //   useLockBodyScroll(!readOnly)
  // }

  /**
   * toggle className for focus outline
   */
  const className = cx(classNameProp, {
    "--focus": ReactEditor.isFocused(editor),
  })

  /**
   * onKeyDown with Editor
   */
  const onBoundKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => onKeyDown(e, editor),
    [editor]
  )

  /**
   * onPaste with Editor
   */
  const onBoundPaste = useCallback(
    (e: React.ClipboardEvent): boolean => onPaste(e, editor),
    [editor]
  )

  /**
   * onDrop with Editor
   */
  const onBoundDrop = useCallback(
    (e: React.DragEvent): boolean => onDrop(e, editor),
    [editor]
  )

  /**
   * onSelect with Editor
   */
  const onSelect = useCallback(() => {
    /**
     * Set the `lastSelection` property on the `Editor` object.
     *
     * The property is used in the toolbar/modals when there is a loss of
     * focus from the `Editor`. We need to reselect the previously held
     * selection so we know what to apply the command to.
     */
    if (editor.selection) {
      editor.lastSelection = editor.selection
    }
  }, [editor])

  /**
   * HELP:
   *
   * If we don't provide `spellCheck`, `autoCorrect` and `autoCapitalize` and
   * set their value to the string "false" (although spellCheck can be set to
   * the boolean value `false` for some reason), we get this warning:
   *
   * ```
   * react-dom.development.js?a814:67 Warning: Extra attributes from the server: spellcheck,autocorrect,autocapitalize
   * ```
   *
   * The closest relevant Slate code is here
   * https://github.com/ianstormtaylor/slate/blob/f40e515dc7f956b7fd859688c0170f2c1763fecf/packages/slate-react/src/components/editable.tsx
   *
   * But it may also be a Next.js issue
   * https://www.google.com/search?q=nextjs+extra+attributes+spellcheck
   */

  return (
    <$Editable
      spellCheck="false"
      autoCorrect="false"
      autoCapitalize="false"
      className={className}
      data-cy={dataCy}
      decorate={decorate}
      readOnly={readOnly}
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      onKeyDown={onBoundKeyDown}
      onPaste={onBoundPaste}
      onDrop={onBoundDrop}
      onSelect={onSelect}
      onBlur={onBlur}
    />
  )
}
