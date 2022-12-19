import { styled } from "goober"
import { forwardRef, useRef } from "react"
import { useSlateStatic } from "slate-react"

import { useAbsoluteReposition } from "~/src/use-reposition"

import * as Icon from "../../icons"
import { $Panel } from "../../styles"
import { CloseMask } from "../shared/close-mask"

function createRange(size: number): number[] {
  return [...Array(size).keys()]
}

export function AnchorDialog({
  dest,
  close,
}: {
  dest: HTMLElement
  close: () => void
}) {
  const editor = useSlateStatic()
  const ref = useRef<HTMLDivElement>(null)
  const style = useAbsoluteReposition({ src: ref, dest }, ({ src, dest }) => {
    return { left: dest.left, top: dest.top + dest.height }
  })

  return (
    <>
      <CloseMask close={close} />
      <$AnchorDialog ref={ref} style={style}>
        <$InputLine>
          <$Input type="text" value="https://www.google.com/" autoFocus />
          <$Button>
            <Icon.Link />
            <Icon.LinkPlus />
          </$Button>
        </$InputLine>
        <$Title>Enter URL of link</$Title>
      </$AnchorDialog>
    </>
  )
}

export const $AnchorDialog = styled($Panel, forwardRef)`
  padding: 1em;
  width: 24em;
`
export const $Title = styled("div", forwardRef)`
  font-size: 0.875em;
  margin-top: 0.5em;
  color: var(--shade-500);
`
const $InputLine = styled("div", forwardRef)`
  display: flex;
  gap: 0.5em;
`

export const $Input = styled("input", forwardRef)`
  flex: 1 1 auto;
  padding: 0.5em 0.75em;
  border-radius: 0.25em;
  color: var(--shade-700);
  border: 1px solid var(--shade-300);
  font-size: 0.9375em;
  &:focus {
    outline: 2px solid var(--blue-200);
  }
`

const $Button = styled("div", forwardRef)`
  /* Center vertically and horizontally */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25em;
  padding: 0 0.5em;
  text-align: center;
  color: var(--blue-100);
  background: var(--blue-400);
  transition: all 100ms;
  &:hover {
    color: var(--blue-50);
    background: var(--blue-500);
    outline: 2px solid var(--blue-200);
  }
  border-radius: 0.25em;
  svg {
    stroke-width: 2px;
  }
`
