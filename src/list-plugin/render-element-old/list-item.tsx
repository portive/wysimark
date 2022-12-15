import { styled } from "goober"
import { forwardRef, useCallback } from "react"
import { Transforms } from "slate"
import { ReactEditor, useSlateStatic } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { ListItemElement } from ".."
import { isDebug } from "./debug"
import { CheckedIcon, UncheckedIcon } from "./icons"

const $ListItem = styled("li", forwardRef)`
  position: relative;
  margin: 1em 0;
  &.--debug {
    background: rgba(127, 255, 127, 0.5);
  }
`

const $TaskListItem = styled($ListItem, forwardRef)`
  list-style-type: none;
  svg {
    position: absolute;
    font-size: 1.25em;
    top: -0.05em;
    cursor: pointer;
    left: -1.35em;
    color: #c0c0c0;
    transition: all 200ms;
    &:hover {
      color: royalblue;
    }
    .--checkmark {
      color: green;
      stroke-width: 3px;
    }
  }
`

export function ListItem({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<ListItemElement>) {
  if (typeof element.checked === "boolean") {
    return (
      <TaskListItem element={element} attributes={attributes}>
        {children}
      </TaskListItem>
    )
  } else {
    return (
      <$ListItem className={isDebug ? "--debug" : ""} {...attributes}>
        {typeof element.checked === "boolean" &&
          (element.checked === true ? <CheckedIcon /> : <UncheckedIcon />)}
        {children}
      </$ListItem>
    )
  }
}

export function TaskListItem({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<ListItemElement>) {
  const editor = useSlateStatic()
  const onClick = useCallback(() => {
    const at = ReactEditor.findPath(editor, element)
    Transforms.setNodes(editor, { checked: !element.checked }, { at })
  }, [element.checked])
  return (
    <$TaskListItem
      className={isDebug ? "--debug" : ""}
      {...attributes}
      data-list-item
    >
      {element.checked === true ? (
        <CheckedIcon onClick={onClick} />
      ) : (
        <UncheckedIcon onClick={onClick} />
      )}
      {children}
    </$TaskListItem>
  )
}
