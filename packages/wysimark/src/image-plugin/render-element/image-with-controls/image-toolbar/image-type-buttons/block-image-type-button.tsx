import { useCallback } from "react"
import { useSlateStatic } from "slate-react"

import { $ImageButton } from "../../../../styles/image-with-controls-styles/image-buttons-styles"
import { ImageBlockElement, ImageInlineElement } from "../../../../types"
import { InlineIcon } from "../../../icons"
import { convertToInlineImage } from "./convert-to-inline-image"

export function BlockImageTypeButton({
  element,
}: {
  element: ImageBlockElement | ImageInlineElement
}) {
  const editor = useSlateStatic()
  const onClickInline = useCallback(() => {
    if (element.type !== "image-block") return
    convertToInlineImage(editor, element)
  }, [editor, element])
  return (
    <$ImageButton
      className={element.type === "image-inline" ? "--selected" : ""}
      onClick={element.type === "image-inline" ? undefined : onClickInline}
    >
      <InlineIcon />
    </$ImageButton>
  )
}
