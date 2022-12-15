import { ConstrainedRenderElementProps } from "~/src/sink"

import { TaskListItemElement } from "../types"
import { CheckedIcon, UncheckedIcon } from "./icons"
import { $TaskListItem } from "./styles"

export function TaskListItem({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<TaskListItemElement>) {
  const style = { "--list-item-depth": element.depth } as React.CSSProperties
  return (
    <$TaskListItem {...attributes} style={style}>
      <div className="--list-item-icon" contentEditable={false}>
        {element.checked ? <CheckedIcon /> : <UncheckedIcon />}
      </div>
      {children}
    </$TaskListItem>
  )
}
