import { ConstrainedRenderElementProps } from "../../sink"
import { CodeBlockElement, CodeBlockLineElement } from "../types"
import { CodeBlock } from "./CodeBlock"
import { CodeBlockLine } from "./CodeBlockLine"

export function renderElement({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<CodeBlockElement | CodeBlockLineElement>) {
  if (element.type === "code-block") {
    return (
      <CodeBlock element={element} attributes={attributes}>
        {children}
      </CodeBlock>
    )
  } else if (element.type === "code-block-line") {
    return (
      <CodeBlockLine element={element} attributes={attributes}>
        {children}
      </CodeBlockLine>
    )
  }
}
