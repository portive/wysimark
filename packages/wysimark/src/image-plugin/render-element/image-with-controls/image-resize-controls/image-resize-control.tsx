import { clsx } from "clsx"
import { Dispatch, SetStateAction, useCallback } from "react"
import { Editor, Transforms } from "slate"
import { ReactEditor, useSlateStatic } from "slate-react"

import { stopEvent } from "~/src/sink"
import { useResizeBrowser } from "~/src/use-reposition/hooks"

import {
  $ImageResizeHandle,
  $ImageResizeInvisibleHandle,
} from "../../../styles/image-with-controls-styles/image-resize-handle-styles"
import {
  ImageBlockElement,
  ImageInlineElement,
  ImageSize,
} from "../../../types"
import { getEditorWidth, minMax, resizeToWidth } from "../../../utils"

/**
 * Helper function finds the `img` inside the current Slate `Element`.
 *
 * The `Element` in the DOM points to the surrounding container, so we search
 * inside of it for the `img` tag which know there is only one of.
 *
 * We then get the client rect from it.
 */
function getImageBoundsFromSlateElement(
  editor: Editor,
  element: ImageBlockElement | ImageInlineElement
): DOMRect {
  const imageContainerDOMNode = ReactEditor.toDOMNode(editor, element)
  const imgDOMNode = imageContainerDOMNode.querySelector("img")
  if (!imgDOMNode)
    throw new Error(`Image Element could not be found but should exist`)
  return imgDOMNode.getBoundingClientRect()
}

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
   * Refreshes the rendering of the resize handle if the browser width is
   * changed. This is useful, for example, if the browser is resized, making
   * the editable area smaller, which in some cases shoudl cause the resize
   * handle to indicate that the image can only be resized smaller.
   */
  useResizeBrowser()

  /**
   * Retrieve the inner (usable) width of the editor.
   */
  const editorWidth = getEditorWidth(editor)

  /**
   * Create some convenience constants that we use a lot below
   */
  const width = size.width
  const maxWidth = Math.min(srcSize.width, editorWidth)
  const minWidth = Math.min(12, srcSize.width)

  /**
   * Start dragging
   */
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      stopEvent(e)
      setIsDragging(true)

      /**
       * Position of mouse pointer when mouse down is pressed
       */
      const startX = e.clientX

      /**
       * The initial image size for the visual image (i.e. the image we are
       * seeing on the screen) can vary from the image width as stored in the
       * Document value.
       *
       * This is because if the document image width value is larger than the
       * screen width, we have constrained the image so that it fits.
       *
       * When we start a resize, we want the resize to start at the visual
       * image width though or the drag may appear broken. For example, if you
       * start resizing smaller, if the image is larger than the width of the
       * screen, the resize will take no effect.
       *
       * For this reason, we start with the visual screen width.
       */
      const bounds = getImageBoundsFromSlateElement(editor, element)
      const startWidth = bounds.width

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
        /**
         * When we save the image to the document, at the moment, we have
         * decided to save the image at the actual resize width, as stored
         * in the resize state. This is different than using the visual
         * image width which is constrained to the width of the screen.
         *
         * Not sure if this is the right approach, but it does allow for a
         * manual workaround if desired where the content is being edited in
         * a smaller screen than the output window and the user wants to have
         * the image display at a larger size.
         *
         * Note that this is already possible (to save at a larger size than
         * the screen width) when using presets so it's not entirely out of
         * character for our editor either.
         */
        const size = {
          width: nextSize.width,
          height: nextSize.height,
        }
        /**
         * It's not, at the moment, strictly necessary to set the size because
         * the size is set during mouse move; however, I'm keeping this here
         * as (a) a sanity check to ensure this is always correct and (b) if
         * we ever decide to modify the size before saving (see the comment
         * above when setting size) then we don't end up in a bad state. This
         * is something that already occurred once during experimenting.
         */
        setSize(size)
        Transforms.setNodes(editor, size, { at: path })
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
    "--left": width >= maxWidth && width > minWidth,
    "--right": width <= minWidth && width < maxWidth,
    "--dragging": isDragging,
    "--small": width <= 64 || size.height <= 64,
  })

  return (
    <>
      {/**
       * The invisible handle is not visible but gives a larger drag handle
       * target for the mouse and touch events
       */}
      <$ImageResizeInvisibleHandle
        className={className}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <$ImageResizeHandle>
          <span className="--bar --bar-left" />
          <span className="--bar --bar-center" />
          <span className="--bar --bar-right" />
        </$ImageResizeHandle>
      </$ImageResizeInvisibleHandle>
    </>
  )
}
