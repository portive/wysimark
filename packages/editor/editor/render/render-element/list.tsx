import cx from "classnames"
import React, { useCallback } from "react"
import { Transforms } from "slate"
import { ReactEditor, useReadOnly, useSlateStatic } from "slate-react"
import { CheckedIcon, UncheckedIcon } from "~/editor/icons"
import { ListItemElement } from "../../types"
import { CustomRenderElementProps } from "./utils"

/**
 * Create indent styling for list items
 */

function getIndentStyle(element: ListItemElement) {
  return { marginLeft: `${element.depth * 1.5}em` }
}

/**
 * Return className with `--is-editing` if we are in editing mode.
 */

function useListItemClassName(className: string): string {
  const readOnly = useReadOnly()
  return cx(className, { "--is-editing": !readOnly })
}

/**
 * Task list item
 */

export function TaskListItem({
  attributes,
  element,
  children,
}: CustomRenderElementProps<"task-list-item">) {
  const editor = useSlateStatic()
  const className = useListItemClassName("--task")
  const style = getIndentStyle(element)
  const clickTaskListElement = useCallback(function clickTaskListElement(
    checked: boolean
  ) {
    const path = ReactEditor.findPath(editor, element)
    Transforms.setNodes(editor, { checked }, { at: path })
  },
  [])
  return (
    <ul {...attributes} className={className} style={style}>
      <li>
        <span contentEditable={false}>
          {element.checked ? (
            <CheckedIcon
              onClick={() => clickTaskListElement(false)}
              width="1.25em"
              height="1.25em"
            />
          ) : (
            <UncheckedIcon
              onClick={() => clickTaskListElement(true)}
              width="1.25em"
              height="1.25em"
            />
          )}
        </span>
        {children}
      </li>
    </ul>
  )
}

/**
 * Unordered list item
 */

export function UnorderedListItem({
  attributes,
  element,
  children,
}: CustomRenderElementProps<"unordered-list-item">) {
  const className = useListItemClassName("--unordered")
  const style = getIndentStyle(element)
  return (
    <ul {...attributes} className={className} style={style}>
      <li>{children}</li>
    </ul>
  )
}

/**
 * Ordered list item
 *
 * Note: Note the same as `UnorderedListItem` it has a `value` attribute.
 */

export function OrderedListItem({
  attributes,
  element,
  children,
}: CustomRenderElementProps<"ordered-list-item">) {
  const className = useListItemClassName("--ordered")
  const style = getIndentStyle(element)
  return (
    <ol {...attributes} className={className} style={style}>
      <li value={element.number}>{children}</li>
    </ol>
  )
}
