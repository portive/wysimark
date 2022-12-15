import clsx from "clsx"
import { useEffect } from "react"
import { ReactEditor, useSlateStatic } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { normalizeOrderedFirstAtDepth } from "../normalize-node"
import { OrderedListItemElement as OrderedListItemElement } from "../types"
import { $OrderedListItem } from "./styles"

export function OrderedListItem({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<OrderedListItemElement>) {
  const editor = useSlateStatic()
  useEffect(() => {
    const path = ReactEditor.findPath(editor, element)
    normalizeOrderedFirstAtDepth(editor, [element, path])
  }, [])
  const style = {
    "--list-item-depth": element.depth,
    "--list-item-var": `list-item-depth-${element.depth}`,
  } as React.CSSProperties
  const className = clsx({ "--first-at-depth": element.__firstAtDepth })
  return (
    <$OrderedListItem {...attributes} className={className} style={style}>
      {children}
    </$OrderedListItem>
  )
}
