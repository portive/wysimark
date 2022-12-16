import clsx from "clsx"
import { styled } from "goober"
import { forwardRef } from "react"
import { Node, Range } from "slate"
import { useSelected, useSlate } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { ParagraphElement } from ".."

const $Paragraph = styled("p", forwardRef)`
  padding: 0;
  margin: 1em 0;

  transition: background-color 200ms, margin-top 200ms, padding-top 200ms,
    margin-bottom 200ms, padding-bottom 200ms, font-size 200ms;

  &.--collapsed {
    font-size: 0.25em; /* font-size is collapsed to 1/4 of regular em */
    margin: -4em 0; /* margin grows to 3/4 of regular em leaving space */
    padding: 2em 0; /* this is kind of eye-balling it */
    border-radius: 1em;
    &:hover {
      background: rgba(0, 127, 255, 0.1);
      cursor: pointer;
    }
  }
`

export function Paragraph({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<ParagraphElement>) {
  const editor = useSlate()
  const selected = useSelected()
  /**
   * One condition of collapsing the paragraph is that the paragraph is empty.
   * We check for empty by checking for one node that contains a text that is
   * empty. If there is an inline element, this will introduce at a minimum
   * 3 nodes based on the way Slate normalizes to always have text nodes at
   * the end which is why this check works.
   */
  const isEmpty =
    element.children.length === 1 &&
    Node.string(element.children[0]).length === 0
  /**
   * We want the paragraph to collapse (because small) when it's empty and
   * the cursor isn't inside of it.
   *
   * Algorithm:
   *
   * If the paragraph is not selected (i.e. the cursor is outside of the
   * paragraph) and the paragraph is empty, we want it to be collapsed.
   *
   * If the selection is in the paragraph, we want the paragraph to not be
   * collapsed; however, there is a situation where the paragraph is empty
   * but the user is selecting a Range which includes the paragraph. In this
   * case, we want it to be small. The quickest check we can make in this
   * situation is to see if the Range is expanded. Normally, we would want to
   * check if the Range is fully inside the paragraph but since an earlier
   * condition is that the paragraph is empty, this check works and executes
   * faster.
   */
  const collapsed =
    isEmpty &&
    (!selected ||
      (selected && editor.selection && Range.isExpanded(editor.selection)))
  return (
    <$Paragraph
      {...attributes}
      className={clsx({ "--collapsed": collapsed })}
      data-collapsed={!!collapsed}
    >
      {children}
    </$Paragraph>
  )
}
