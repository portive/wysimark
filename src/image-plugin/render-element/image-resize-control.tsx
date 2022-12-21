import clsx from "clsx"
import { styled } from "goober"
import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useCallback,
  useState,
} from "react"

import { stopEvent } from "~/src/sink"

import { ImageSize } from "../types"
import { minMax, resizeToWidth } from "../utils"
import { ResizeIcon } from "./icons"
import {
  $ImageResizeHandle,
  $ImageResizeInvisibleHandle,
} from "./image-resize-control-styles"

export function ImageResizeControl({
  srcSize,
  size,
  setSize,
}: {
  srcSize: ImageSize
  size: ImageSize
  setSize: Dispatch<SetStateAction<ImageSize | null>>
}) {
  const [isDragging, setIsDragging] = useState(false)

  const width = size.width
  const maxWidth = srcSize.width
  const minWidth = Math.min(32, srcSize.width)

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      stopEvent(e)
      setIsDragging(true)
      const startX = e.clientX
      const startWidth = size.width

      const onDocumentMouseMove = (e: MouseEvent) => {
        stopEvent(e)

        const nextWidth = minMax({
          value: startWidth + e.clientX - startX,
          min: minWidth,
          max: maxWidth,
        })
        const nextSize = resizeToWidth(nextWidth, srcSize)

        setSize(nextSize)
      }

      const onDocumentMouseUp = () => {
        document.removeEventListener("mousemove", onDocumentMouseMove)
        document.removeEventListener("mouseup", onDocumentMouseUp)
        setIsDragging(false)
      }

      /**
       * Attach document event listeners
       */
      document.addEventListener("mousemove", onDocumentMouseMove)
      document.addEventListener("mouseup", onDocumentMouseUp)
    },
    [srcSize.width, srcSize.height, size.width]
  )

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
