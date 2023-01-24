import { useCallback } from "react"
import { useSlateStatic } from "slate-react"

import { $ImageButton } from "../../../../styles/image-with-controls-styles/image-buttons-styles"
import { ImageBlockElement, ImageInlineElement } from "../../../../types"
import { BlockIcon } from "../../../icons"
import { convertToBlockImage } from "./convert-to-block-image"

export function InlineImageTypeButton({
  element,
}: {
  element: ImageBlockElement | ImageInlineElement
}) {
  const editor = useSlateStatic()
  const onClickBlock = useCallback(() => {
    if (element.type !== "image-inline") return
    convertToBlockImage(editor, element)
  }, [editor, element])

  return (
    <$ImageButton
      className={element.type === "image-block" ? "--selected" : ""}
      onClick={element.type === "image-block" ? undefined : onClickBlock}
    >
      <BlockIcon />
    </$ImageButton>
  )
}
