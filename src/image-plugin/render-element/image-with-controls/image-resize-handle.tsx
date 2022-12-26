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
   * FIXME:
   *
   * This can be refactored so that it shares more code with `onMouseDown`
   * above. They are nearly identical except:
   *
   * - the event listeners that are added/removed
   * - the way way in which clientX is retrieved
   */
  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      stopEvent(e)
      setIsDragging(true)
      const startX = e.changedTouches[0].clientX
      const startWidth = size.width

      let nextSize = { ...size }

      const onDocumentTouchMove = (te: TouchEvent) => {
        // stopEvent(te)
        const e = te.changedTouches[0]

        const nextWidth = minMax({
          value: startWidth + e.clientX - startX,
          min: minWidth,
          max: maxWidth,
        })
        nextSize = resizeToWidth(nextWidth, srcSize)

        setSize(nextSize)
      }
      const onDocumentTouchEnd = () => {
        console.log("end")
        document.removeEventListener("touchmove", onDocumentTouchMove)
        document.removeEventListener("touchend", onDocumentTouchEnd)
        const path = ReactEditor.findPath(editor, element)
        Transforms.setNodes(
          editor,
          { width: nextSize.width, height: nextSize.height },
          { at: path }
        )
        setIsDragging(false)
      }

      document.addEventListener("touchmove", onDocumentTouchMove)
      document.addEventListener("touchend", onDocumentTouchEnd)
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
        onTouchStart={onTouchStart}
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
