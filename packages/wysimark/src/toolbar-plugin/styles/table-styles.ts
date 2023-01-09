import { styled } from "goober"
import { forwardRef } from "react"

import { $Panel } from "."

export const $TableDialog = styled($Panel, forwardRef)`
  padding: 0.5em;
`
export const $TableDialogGrid = styled("div", forwardRef)`
  display: grid;
  grid-template-columns: repeat(5, 1.75em);
  grid-template-rows: 1.5em;
  /* grid-gap: 1px; */
`
export const $TableDialogGridCell = styled("div", forwardRef)`
  background: var(--shade-100);
  height: 1.5em;
  border-radius: 0.125em;
  border-right: 1px solid white;
  border-top: 1px solid white;
  cursor: pointer;
  &.--selected {
    background: var(--blue-100);
  }
`
