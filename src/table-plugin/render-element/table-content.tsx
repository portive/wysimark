import { ConstrainedRenderElementProps } from "~/src/sink"

import { TableContentElement } from "../types"

export function TableContent({
  attributes,
  children,
}: ConstrainedRenderElementProps<TableContentElement>) {
  return <div {...attributes}>{children}</div>
}
