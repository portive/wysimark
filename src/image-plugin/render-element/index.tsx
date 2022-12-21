import { styled } from "goober"
import { forwardRef } from "react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { ImageBlockElement, ImageInlineElement } from "../types"
import { Image } from "./image"

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
    case "image-inline":
      return (
        <ImageInline element={element} attributes={attributes}>
          {children}
        </ImageInline>
      )
  }
}

const $ImageBlockContainer = styled("div", forwardRef)`
  display: block;
  margin: 1em 0;
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

const $ImageInlineContainer = styled("span", forwardRef)`
  display: inline;
`

function ImageInline({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<ImageInlineElement>) {
  return (
    <span {...attributes} style={{ display: "inline-block" }}>
      <$ImageInlineContainer contentEditable={false}>
        <Image element={element} inline />
      </$ImageInlineContainer>
      {children}
    </span>
  )
}
