import { ConstrainedRenderElementProps } from "~/src/sink"

import { FootnoteElement } from ".."

export function Footnote({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<FootnoteElement>) {
  console.log({ element, attributes, children })
}
