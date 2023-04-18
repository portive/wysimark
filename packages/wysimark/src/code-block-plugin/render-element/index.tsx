import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "../../sink"
import { $CodeBlock, $CodeBlockLanguage, $CodeLine } from "../styles"
import { CodeBlockElement, CodeBlockLineElement } from "../types"

export function renderElement({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<CodeBlockElement | CodeBlockLineElement>) {
  const selected = useSelected()
  if (element.type === "code-block") {
    return (
      <$CodeBlock className={selected ? "--selected" : ""} {...attributes}>
        <$CodeBlockLanguage contentEditable={false}>
          {element.language}
        </$CodeBlockLanguage>
        <code style={{ fontFamily: "andale mono" }}>{children}</code>
      </$CodeBlock>
    )
  } else if (element.type === "code-block-line") {
    return (
      <$CodeLine
        className={selected ? "--selected" : ""}
        {...attributes}
        spellCheck="false"
      >
        {children}
      </$CodeLine>
    )
  }
}
