import { ConstrainedRenderElementProps } from "~/src/sink"

import { ClipItemOpenElement } from ".."

export function Clip({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<ClipItemOpenElement>) {
  console.log({ element, attributes, children })
}
