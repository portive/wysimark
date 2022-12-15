import { ConstrainedRenderElementProps } from "~/src/sink"

import { UnorderedListItemElement } from "../types"
import { BulletIcon } from "./icons"
import { $UnorderedListItem } from "./styles"

export function UnorderedListItem({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<UnorderedListItemElement>) {
  const style = { "--list-item-depth": element.depth } as React.CSSProperties
  return (
    <$UnorderedListItem {...attributes} style={style}>
      <div className="--list-item-icon" contentEditable={false}>
        <BulletIcon />
      </div>
      {children}
    </$UnorderedListItem>
  )
}
