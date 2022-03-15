import cx from "classnames"
import React, { useCallback, useMemo } from "react"
import { Path } from "slate"
import { ReactEditor } from "slate-react"
import {
  RenderElementProps,
  useFocused,
  useSelected,
  useSlateStatic,
} from "slate-react"
import {
  getNodeAfterIf,
  getNodeBeforeIf,
  insertParagraphAt,
} from "~/editor/custom"
import { isSeamlessElement } from "~/editor/types"
import { stopEvent } from "~/lib/stop-event"
import { useHover } from "~/lib/use-hover"
import { $InsertButton, $InsertLine, $SeamlessContainer } from "./styles"

export function SeamlessContainer({
  attributes,
  children,
  element,
}: {
  attributes: RenderElementProps["attributes"]
  element: RenderElementProps["element"]
  children: React.ReactNode
}) {
  /**
   * Get Slate objects and values
   */
  const editor = useSlateStatic()
  const selected = useSelected()
  const focused = useFocused()
  const highlighted = selected && focused

  const { isHover, onMouseEnter, onMouseLeave } = useHover()

  const showInsertBefore = useMemo(() => {
    if (!highlighted && !isHover) return false
    const path = ReactEditor.findPath(editor, element)
    const entry = getNodeBeforeIf(editor, path)
    if (!entry) return true
    return isSeamlessElement(entry[0])
  }, [editor, highlighted, element, isHover])

  const showInsertAfter = useMemo(() => {
    if (!highlighted && !isHover) return false
    const path = ReactEditor.findPath(editor, element)
    const entry = getNodeAfterIf(editor, path)
    if (!entry) return true // if no element after, we want to allow to add one like last item in blockquote
    return isSeamlessElement(entry[0])
  }, [editor, highlighted, element, isHover])

  const insertPrevious = useCallback(
    (e: React.MouseEvent) => {
      stopEvent(e)
      const path = ReactEditor.findPath(editor, element)
      insertParagraphAt(editor, path)
    },
    [editor, element]
  )

  const insertNext = useCallback(
    (e: React.MouseEvent) => {
      stopEvent(e)
      const path = ReactEditor.findPath(editor, element)
      insertParagraphAt(editor, Path.next(path))
    },
    [editor, element]
  )

  return (
    <$SeamlessContainer
      {...attributes}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
      {showInsertBefore && (
        <Insert className="--previous" onMouseDown={insertPrevious} />
      )}
      {showInsertAfter && (
        <Insert className="--next" onMouseDown={insertNext} />
      )}
    </$SeamlessContainer>
  )
}

function Insert({
  className,
  onMouseDown,
}: {
  className: string
  onMouseDown: React.MouseEventHandler
}) {
  const { isHover, onMouseEnter, onMouseLeave } = useHover()

  const calculatedClassName = cx(className, {
    "--hover": isHover,
  })

  return (
    <>
      <$InsertLine contentEditable={false} className={calculatedClassName} />
      <$InsertButton
        contentEditable={false}
        className={calculatedClassName}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        ⏎
      </$InsertButton>
    </>
  )
}
