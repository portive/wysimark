import { clsx } from "clsx"
import { styled } from "goober"
import { forwardRef, useState } from "react"
import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"
import { useUpload } from "~/src/upload-plugin/store"

import { ImageBlockElement, ImageInlineElement, ImageInterface } from "../types"
import { ImageResizeControl } from "./image-resize-control"

export function renderElement({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<ImageBlockElement | ImageInlineElement>) {
  switch (element.type) {
    case "image-block":
      return (
        <ImageBlock element={element} attributes={attributes}>
          {children}
        </ImageBlock>
      )
  }
}

const $ImageBlockContainer = styled("div", forwardRef)`
  display: block;
  margin: 1em 0;
`

const $TightImageWrapper = styled("div", forwardRef)`
  display: inline-block;
  position: relative;
`

const $Image = styled("img", forwardRef)`
  border-radius: 0.5em;
  display: block;
  &.--selected {
    outline: 2px solid var(--select-color);
    outline-offset: 1px;
  }
  background: var(--shade-100);
`

function ImageBlock({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<ImageBlockElement>) {
  return (
    <div {...attributes}>
      <$ImageBlockContainer contentEditable={false}>
        <Image element={element} />
      </$ImageBlockContainer>
      {children}
    </div>
  )
}

export function Image({ element }: { element: ImageInterface }) {
  const upload = useUpload(element.url)
  const selected = useSelected()

  const [size, setSize] = useState(
    element.srcWidth && element.srcHeight && element.width && element.height
      ? {
          width: element.width,
          height: element.height,
        }
      : null
  )

  const srcSize =
    element.srcWidth && element.srcHeight
      ? { width: element.srcWidth, height: element.srcHeight }
      : null
  return (
    <$TightImageWrapper>
      <$Image
        className={clsx({ "--selected": selected })}
        src={upload.url}
        width={size?.width}
        height={size?.height}
      />
      {selected && size && srcSize ? (
        <ImageResizeControl srcSize={srcSize} size={size} setSize={setSize} />
      ) : null}
    </$TightImageWrapper>
  )
}
