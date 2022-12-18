import { styled } from "goober"
import { forwardRef } from "react"

import { $Container } from "../shared-layout"

export const $$Container = styled($Container, forwardRef)`
  /**
   * We use this to make sure the top of the container is rounded even though
   * the toolbar inside is square. We keep the toolbar square so that as the
   * toolbar hits the top when scrolling, it can become sticky. We can try to
   * round the toolbar, but it causes an issue where the part under the
   * rounded part is still visible (i.e. the edge of the container). We can
   * then try to put an absolutely positioned background on it with an opaque
   * color, but that doesn't work unless we know the color of the background
   * so... ultimately, it's not a good solution.
   *
   * NOTE:
   *
   * Using "overflow: hidden;" will break the "position: sticky;" and it will
   * not work. "overflow: clip;" does work though.
   *
   * https://stackoverflow.com/a/73051006
   */
  overflow-y: clip;
`

export const $Toolbar = styled("div", forwardRef)`
  /**
   * If "position: sticky;" is not working, check the ancestor for 
   * "overflow: hidden;" of any kind. This will stop sticky from working.
   * A good workaround is to use "overflow: clip;" instead.
   *
   * https://stackoverflow.com/a/73051006
   */
  position: sticky;
  display: flex;
  align-items: center;
  top: 0;
  z-index: 2;
  background: var(--shade-50);
  font-size: 0.9375em;
  padding: 0 0.5em;
  border-bottom: 1px solid var(--shade-300);
  box-sizing: border-box;
`

export const $Editable = styled("div", forwardRef)`
  padding: 2em;
`

export const $Divider = styled("div", forwardRef)`
  display: inline-block;
  background: var(--shade-200);
  opacity: 50%;
  width: 1px;
  height: 3em;
  margin: 0 0.375em;
`

export const $Button = styled("div", forwardRef)`
  display: flex;
  font-size: 1.25em;
  padding: 0.375em 0.375em;
  border-radius: 0.25em;
  text-align: center;
  color: var(--shade-500);
  transition: all 100ms;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0);
  &.--active {
    color: var(--shade-700);
    background: rgba(0, 0, 0, 0.05);
    svg {
      /* stroke-width: 2px; */
    }
  }
  svg {
    stroke-width: 1.5px;
  }
  &:hover {
    color: var(--shade-700);
    background: var(--blue-100);
    svg {
      /* stroke-width: 2px; */
    }
  }
`
