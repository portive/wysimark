import { clsx } from "clsx"
import { Dispatch, SetStateAction, useCallback } from "react"
import { Transforms } from "slate"
import { ReactEditor, useSlateStatic } from "slate-react"

import { stopEvent } from "~/src/sink"

import {
  $ImageResizeHandle,
  $ImageResizeInvisibleHandle,
} from "../../styles/image-with-controls-styles/image-resize-handle-styles"
import { ImageBlockElement, ImageInlineElement, ImageSize } from "../../types"
import { minMax, resizeToWidth } from "../../utils"

export function ImageResizeControl({
  element,
  srcSize,
  size,
  setSize,
  isDragging,
  setIsDragging,
}: {
  element: ImageBlockElement | ImageInlineElement
  srcSize: ImageSize
  size: ImageSize
  setSize: Dispatch<SetStateAction<ImageSize | null>>
  isDragging: boolean
  setIsDragging: Dispatch<SetStateAction<boolean>>
}) {
  const editor = useSlateStatic()

  /**
   * Create some convenience constants that we use a lot below
   */
  const width = size.width
  const maxWidth = srcSize.width
  const minWidth = Math.min(12, srcSize.width)

  /**
   * Start dragging
   */
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      stopEvent(e)
      setIsDragging(true)
      const startX = e.clientX
      const startWidth = size.width

      let nextSize = { ...size }

      /**
       * Watch mouse movement during dragging
       */
      const onDocumentMouseMove = (e: MouseEvent) => {
        stopEvent(e)

        const nextWidth = minMax({
          value: startWidth + e.clientX - startX,
          min: minWidth,
          max: maxWidth,
        })
        nextSize = resizeToWidth(nextWidth, srcSize)

        setSize(nextSize)
      }

      /**
       * Remove dragging event listeners when releasing mouse button
       */
      const onDocumentMouseUp = () => {
        document.removeEventListener("mousemove", onDocumentMouseMove)
        document.removeEventListener("mouseup", onDocumentMouseUp)
        const path = ReactEditor.findPath(editor, element)
        Transforms.setNodes(
          editor,
          { width: nextSize.width, height: nextSize.height },
          { at: path }
        )
        setIsDragging(false)
      }

      /**
       * Attach event listeners directly to document
       */
      document.addEventListener("mousemove", onDocumentMouseMove)
      document.addEventListener("mouseup", onDocumentMouseUp)
    },
    [srcSize.width, srcSize.height, size.width, element]
  )

  /**
   * Add special classNames to modify appearance of resize controls
   */
  const className = clsx({
    "--center": width < maxWidth && width > minWidth,
    "--left": width == maxWidth && width > minWidth,
    "--right": width === minWidth && width < maxWidth,
    "--dragging": isDragging,
    "--small": width <= 64 || size.height <= 64,
  })

  return (
    <>
      <$ImageResizeInvisibleHandle
        className={className}
        onMouseDown={onMouseDown}
      >
        <$ImageResizeHandle>
          <div className="--bar --bar-left" />
          <div className="--bar --bar-center" />
          <div className="--bar --bar-right" />
        </$ImageResizeHandle>
      </$ImageResizeInvisibleHandle>
    </>
  )
}
