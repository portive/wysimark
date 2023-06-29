import { SVGProps } from "react"
import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps, TablerIcon } from "../../sink"
import { $CodeBlock, $CodeBlockLanguage } from "../styles"
import { CodeBlockElement } from "../types"

export function CodeBlock({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<CodeBlockElement>) {
  const selected = useSelected()
  return (
    <$CodeBlock className={selected ? "--selected" : ""} {...attributes}>
      <$CodeBlockLanguage contentEditable={false}>
        <span>{element.language}</span>
        <ChevronDownIcon />
      </$CodeBlockLanguage>
      <code>{children}</code>
    </$CodeBlock>
  )
}

export const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <TablerIcon {...props}>
    <path d="m6 9 6 6 6-6" />
  </TablerIcon>
)
