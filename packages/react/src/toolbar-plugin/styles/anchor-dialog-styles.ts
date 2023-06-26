import styled from "@emotion/styled"

import { $Panel } from "../../shared-overlays/styles/$Panel"

export const $AnchorDialog = styled($Panel)`
  padding: 1em;
  width: 24em;
`
export const $AnchorDialogInputLine = styled("div")`
  display: flex;
  gap: 0.5em;
`

export const $AnchorDialogInput = styled("input")`
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
