import { ConstrainedRenderElementProps } from "~/src/sink"

import { OrderedListItemElement as OrderedListItemElement } from "../types"
import { $OrderedListItem } from "./styles"

export function OrderedListItem({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<OrderedListItemElement>) {
  const style = { "--list-item-depth": element.depth } as React.CSSProperties
  return (
    <$OrderedListItem {...attributes} style={style}>
      {/* <div className="--list-item-number" contentEditable={false}>
        {element.number}.
      </div> */}
      {children}
    </$OrderedListItem>
  )
}
