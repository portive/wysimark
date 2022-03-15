import React from "react"
import { SeamlessContainer } from "./seamless-container"
import { CustomRenderElementProps } from "./utils"

/**
 * Code
 */
export function CodeBlock({
  attributes,
  element,
  children,
}: CustomRenderElementProps<"code-block">) {
  return (
    <SeamlessContainer attributes={attributes} element={element}>
      <div style={{ padding: "0.5em 0" }}>
        <pre>
          <code spellCheck={false}>{children}</code>
        </pre>
      </div>
    </SeamlessContainer>
  )
}

/**
 * Codeline
 */
export function CodeLine({
  attributes,
  children,
}: CustomRenderElementProps<"code-line">) {
  return (
    <div {...attributes} spellCheck={false}>
      {children}
    </div>
  )
}
