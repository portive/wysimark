import { styled } from "goober"
import { forwardRef } from "react"

import { Panel } from "./panel-styles"

export const $Menu = styled(Panel, forwardRef)`
  padding-top: 0.5em;
  padding-bottom: 0.5em;
`

export const $MenuItem = styled("div", forwardRef)`
  display: flex;
  padding: 0 1em 0 1.5em;
  height: 2em;
  align-items: center;
  .--icon {
    flex: 0 0;
    display: block;
    font-size: 1.25em;
    height: 1em;
    padding-right: 0.75em;
    color: var(--shade-400);
    svg {
      stroke-width: 1.5px;
    }
  }
  .--title {
    flex: 1 0;
    font-size: 0.875em;
    color: var(--shade-800);
  }
  .--hotkey {
    flex: 0 0;
    font-size: 0.75em;
    padding-left: 1.5em;
    color: var(--shade-500);
  }
  background: white;
  cursor: pointer;
  &:hover {
    background: var(--blue-50);
  }
`

export const $MenuDivider = styled("div", forwardRef)`
  height: 1px;
  background: var(--shade-200);
  margin-top: 0.25em;
  margin-bottom: 0.25em;
`
