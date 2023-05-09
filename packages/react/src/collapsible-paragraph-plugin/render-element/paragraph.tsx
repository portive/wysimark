import { clsx } from "clsx"
import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { ParagraphElement } from ".."
import { $Paragraph } from "./styles"
import { getIsEmpty } from "./utils"

export function Paragraph({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<ParagraphElement>) {
  const selected = useSelected()
  const isEmpty = getIsEmpty(element)
  return (
    <$Paragraph
      {...attributes}
      className={clsx({
        "--selected": selected,
        "--empty": isEmpty,
        "--collapsible": !!element.__collapsible,
      })}
    >
      {children}
    </$Paragraph>
  )
}
