import { useCallback } from "react"
import { useSlateStatic } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { TaskListItemElement } from "../types"
import { CheckedIcon, UncheckedIcon } from "./list-icons"
import { $TaskListItem } from "./styles"

export function TaskListItem({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<TaskListItemElement>) {
  const editor = useSlateStatic()
  const toggle = useCallback(() => {
    editor.list.toggleTaskListItem({ at: element })
  }, [editor, element])

  const style = { "--list-item-depth": element.depth } as React.CSSProperties
  return (
    <$TaskListItem {...attributes} style={style}>
      <div className="--list-item-icon" contentEditable={false}>
        {element.checked ? (
          <CheckedIcon onClick={toggle} style={{ cursor: "pointer" }} />
        ) : (
          <UncheckedIcon onClick={toggle} style={{ cursor: "pointer" }} />
        )}
      </div>
      {children}
    </$TaskListItem>
  )
}
