import { ConstrainedRenderElementProps } from "~/src/sink"

import { ListItemElement } from "../types"
import { OrderedListItem } from "./ordered-list-item"
import { TaskListItem } from "./task-list-item"
import { UnorderedListItem } from "./unordered-list-item"

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
