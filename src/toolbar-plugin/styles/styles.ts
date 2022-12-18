import { styled } from "goober"
import { forwardRef } from "react"

import { SinkReset } from "~/src/sink/create-sink/sink-editable"

import { $Container } from "../../shared-layout"

export const $OuterContainer = styled($Container, forwardRef)`
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

export const $Menu = styled(SinkReset, forwardRef)`
  position: absolute;
  z-index: 1000;
  border: 1px solid var(--table-border-color);
  border-radius: 0.5em;
  overflow: clip;
  /* filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))
    drop-shadow(0 1px 1px rgb(0 0 0 / 0.06)); */
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  background: white;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
`

export const $MenuItem = styled("div", forwardRef)`
  display: flex;
  padding: 0 1em 0 1.5em;
  height: 2em;
  align-items: center;
  .--icon {
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
    font-size: 0.875em;
    color: var(--shade-800);
  }
  .--hotkey {
    font-size: 0.75em;
    padding-left: 1.5em;
    color: var(--shade-500);
  }
  background: white;
  /* border-top: 1px solid var(--shade-200);
  &:first-of-type {
    border-top: 0px none;
  } */
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
