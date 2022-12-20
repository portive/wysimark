import { ConstrainedRenderElementProps } from "~/src/sink"

import { UploadElement } from ".."

export function Upload({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<UploadElement>) {
  console.log({ element, attributes, children })
}
