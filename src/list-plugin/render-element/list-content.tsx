import { ConstrainedRenderElementProps } from "~/src/sink"

import { ListItemContent } from ".."

export function ListItemContent({
  attributes,
  children,
}: ConstrainedRenderElementProps<ListItemContent>) {
  return <div {...attributes}>{children}</div>
}
