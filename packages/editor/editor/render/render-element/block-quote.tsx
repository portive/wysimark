import React from "react"
import { SeamlessContainer } from "./seamless-container"
import { CustomRenderElementProps } from "./utils"

/**
 * Block Quote
 */
export function BlockQuote({
  attributes,
  children,
  element,
}: CustomRenderElementProps<"blockquote">) {
  return (
    <SeamlessContainer attributes={attributes} element={element}>
      {/* <blockquote {...attributes}>{children}</blockquote> */}
      <blockquote>{children}</blockquote>
    </SeamlessContainer>
  )
}
