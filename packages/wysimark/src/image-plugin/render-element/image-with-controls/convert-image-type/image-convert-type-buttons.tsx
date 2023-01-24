import React, { useCallback } from "react"
import { Element } from "slate"
import { useSlateStatic } from "slate-react"

import {
  $ImageButton,
  $ImageButtons,
} from "../../../styles/image-with-controls-styles/image-buttons-styles"
import { ImageBlockElement, ImageInlineElement } from "../../../types"
import { BlockIcon, InlineIcon } from "../../icons"
import { convertToBlockImage } from "./convert-to-block-image"
import { convertToInlineImage } from "./convert-to-inline-image"

export function ImageTypeButtons({
  element,
}: {
  element: ImageBlockElement | ImageInlineElement
}) {
  const editor = useSlateStatic()
  const onClickInline = useCallback(() => {
    if (element.type !== "image-block") return
    convertToInlineImage(editor, element)
  }, [editor, element])

  const onClickBlock = useCallback(() => {
    if (element.type !== "image-inline") return
    convertToBlockImage(editor, element)
  }, [editor, element])

  return (
    <$ImageButtons>
      {/* convert to image block button */}
      <$ImageButton
        className={element.type === "image-block" ? "--selected" : ""}
        onClick={element.type === "image-block" ? undefined : onClickBlock}
      >
        <BlockIcon />
      </$ImageButton>
      {/* convert to image inline button */}
      <$ImageButton
        className={element.type === "image-inline" ? "--selected" : ""}
        onClick={element.type === "image-inline" ? undefined : onClickInline}
      >
        <InlineIcon />
      </$ImageButton>
    </$ImageButtons>
  )
}
