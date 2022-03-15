import cx from "classnames"
import React, { useCallback, useMemo, useRef, useState } from "react"
import { Transforms } from "slate"
import { useFocused, useSelected, useSlateStatic } from "slate-react"
import * as Custom from "~/editor/custom"
import { SeamlessContainer } from "../seamless-container"
import { CustomRenderElementProps } from "../utils"
import {
  $Handle,
  $Image,
  $InvisibleHandle,
  $OuterContainer,
  $Size,
  $TightContainer,
} from "./styles"

type Mode = { type: "ready" } | { type: "drag" }

const MIN_WIDTH = 40
const MAX_WIDTH = 1024

export function Media({
  attributes,
  children,
  element,
}: CustomRenderElementProps<"media">) {
  /**
   * Get Slate objects and values
   */
  const editor = useSlateStatic()
  const selected = useSelected()
  const focused = useFocused()
  const highlighted = selected && focused

  /**
   * Return the `activeImage` which tells us if the image can be resized and
   * the current width/height as well as the original width/heigh information.
   */
  const activeImage = useMemo(
    () => editor.createActiveImage(element.url),
    [element.url]
  )

  /**
   * Are we in ready or dragging mode
   */
  const [mode, setMode] = useState<Mode>(() => ({ type: "ready" }))

  /**
   * When the user is dragging, we use a max size image to display. This is
   * because if the image starts small and we resize to big, it becomes
   * blurry. By using the max image size, we are always dragging a high
   * fidelity image
   */
  const displayUrl = useMemo(() => {
    if (mode.type !== "drag" || activeImage.type !== "dynamic") {
      return activeImage.url
    }
    const width = Math.min(MAX_WIDTH, activeImage.originalWidth)
    const height =
      (width * activeImage.originalHeight) / activeImage.originalWidth
    return activeImage.resize(width, height)
  }, [activeImage, mode.type])

  /**
   * What is the display size from the URL of the image. Note: The image size
   * can be `undefined` which means that it is a static image (i.e. an image
   * that we don't know how to resize)
   */
  const [size, setSize] = useState(() =>
    activeImage.type === "dynamic"
      ? {
          width: activeImage.width,
          height: activeImage.height,
        }
      : { width: undefined, height: undefined }
  )
  const sizeRef = useRef(size)

  /**
   * Mouse down starts the resize
   */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (activeImage.type === "static") return
    if (sizeRef.current.width == undefined) return
    if (sizeRef.current.height == undefined) return
    setMode({ type: "drag" })
    const startX = e.clientX
    const startWidth = sizeRef.current.width
    let currentSize = sizeRef.current

    /**
     * Handle resize dragging through an event handler on mouseMove on the
     * document.
     */
    function onDocumentMouseMove(e: MouseEvent) {
      if (activeImage.type === "static") return

      const maxWidth = Math.min(
        Custom.getEditorInnerWidth(editor),
        activeImage.originalWidth,
        MAX_WIDTH
      )

      /**
       * Calculate the proposed width based on drag position
       */
      const proposedWidth = startWidth + e.clientX - startX

      /**
       * Constrain the proposed with between min, max and original width
       */
      const nextWidth = Math.min(maxWidth, Math.max(MIN_WIDTH, proposedWidth))

      /**
       * Calculate the inverseAspect (used to calculate height)
       */
      const inverseAspect =
        activeImage.originalHeight / activeImage.originalWidth

      /**
       * Calculate height
       */
      const nextHeight = Math.round(nextWidth * inverseAspect)

      /**
       * Set size on the state (to show resize) and the ref (for use in this
       * method)
       */
      currentSize = { width: nextWidth, height: nextHeight }

      setSize(currentSize)
      sizeRef.current = currentSize
    }

    const originalCursor = document.body.style.cursor

    /**
     * When the user releases the mouse, remove all the event handlers
     */
    function onDocumentMouseUp() {
      document.removeEventListener("mousemove", onDocumentMouseMove)
      document.removeEventListener("mouseup", onDocumentMouseUp)
      setMode({ type: "ready" })
      document.body.style.cursor = originalCursor

      /**
       * Set the image url for the new size of image
       */
      if (activeImage.type === "static") return
      const url = activeImage.resize(currentSize.width, currentSize.height)
      Transforms.setNodes(editor, { url })
    }

    /**
     * Attach document event listeners
     */
    document.addEventListener("mousemove", onDocumentMouseMove)
    document.addEventListener("mouseup", onDocumentMouseUp)

    /**
     * While dragging, we want the cursor to be `ew-resize` (left-right arrow)
     * even if the cursor happens to not be exactly on the handle at the moment
     * due to a delay in the cursor moving to a location and the image resizing
     * to it.
     *
     * Also, image has max width/height and the cursor can fall outside of it.
     */
    document.body.style.cursor = "ew-resize"
  }, [])

  const imageClassName = cx({ "--focused": highlighted })

  return (
    <SeamlessContainer attributes={attributes} element={element}>
      <$OuterContainer>
        {/* We place the children above the image so that if the image is off
         * screen, it prefers the top of the image to the bottom when it scrolls
         * into view. This makes more sense than scrolling to the bottom of the
         * image.
         */}
        {children}
        {/* We need a $TightContainer and a div container so that we get a
         * container the size of the image that we can use to place the
         * drag handler using absolute positioning.
         */}
        <$TightContainer contentEditable={false}>
          <$Image
            src={displayUrl}
            width={size.width}
            height={size.height}
            className={imageClassName}
          />
          {highlighted ? (
            <>
              {/* <$Border /> */}
              {mode.type === "drag" ? (
                <$Size
                  className={cx({
                    "--small":
                      typeof size.width === "number" && size.width <= 75,
                  })}
                >
                  {size.width} &times; {size.height}
                </$Size>
              ) : null}
              {activeImage.type === "dynamic" ? (
                <>
                  <$Handle>
                    <div className="--bar --bar-1" />
                    <div className="--bar --bar-2" />
                    <div className="--bar --bar-3" />
                  </$Handle>
                  <$InvisibleHandle onMouseDown={onMouseDown} />
                </>
              ) : null}
            </>
          ) : null}
        </$TightContainer>
      </$OuterContainer>
    </SeamlessContainer>
  )
}
