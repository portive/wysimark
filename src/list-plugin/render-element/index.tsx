import { ConstrainedRenderElementProps } from "~/src/sink"

import {
  ListItemElement,
  OrderedListItemElement as OrderedListItem,
  TaskListItemElement,
  UnorderedListItemElement as UnorderedListItem,
} from "../types"
import { BulletIcon, CheckedIcon, UncheckedIcon } from "./icons"
import { $OrderedListItem, $TaskListItem, $UnorderedListItem } from "./styles"

function OrderedListItem({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<OrderedListItem>) {
  const style = { "--list-item-depth": element.depth } as React.CSSProperties
  return (
    <$OrderedListItem {...attributes} style={style}>
      <div className="--list-item-number" contentEditable={false}>
        {element.number}.
      </div>
      {children}
    </$OrderedListItem>
  )
}

function UnorderedListItem({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<UnorderedListItem>) {
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

function TaskListItem({
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

export function renderElement({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<ListItemElement>) {
  switch (element.type) {
    case "ordered-list-item":
      return (
        <OrderedListItem element={element} attributes={attributes}>
          {children}
        </OrderedListItem>
      )
    case "unordered-list-item":
      return (
        <UnorderedListItem element={element} attributes={attributes}>
          {children}
        </UnorderedListItem>
      )
    case "task-list-item":
      return (
        <TaskListItem element={element} attributes={attributes}>
          {children}
        </TaskListItem>
      )
  }
}
