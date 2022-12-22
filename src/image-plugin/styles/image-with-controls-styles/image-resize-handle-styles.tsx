import { styled } from "goober"
import { forwardRef } from "react"

export const $ImageResizeInvisibleHandle = styled("div", forwardRef)`
  position: absolute;
  display: block;
  background: rgba(127, 127, 127, 0.001);
  top: 0;
  right: calc(-1em - 2px);
  width: 2em;
  bottom: 0;
  &.--left {
    cursor: w-resize;
  }
  &.--center {
    cursor: ew-resize;
  }
  &.--right {
    cursor: e-resize;
  }
  &.--small {
    right: calc(-1.25em);
    /* background: green; */
    width: 1.25em;
  }
`
const $ImageResizeHandleBase = styled("div", forwardRef)`
  position: absolute;
  display: block;
  background: var(--select-color);
  top: 50%;
`

export const $ImageResizeHandle = styled($ImageResizeHandleBase, forwardRef)`
  margin-top: -1em;
  width: 1em;
  height: 2em;
  outline: 1px solid white;
  transition: all 250ms;
  .--center > & {
    left: 0.5em;
    border-radius: 0.375em;
  }
  .--left > & {
    border-radius: 0.5em 0 0 0.5em;
    left: 1px;
  }
  .--right > & {
    border-radius: 0 0.5em 0.5em 0;
    left: calc(50% - 1px);
  }
  .--small > & {
    width: 0.75em;
    height: 1em;
    left: 0.25em;
    margin-top: -0.5em;
  }
  .--small.--center > & {
    border-radius: 0.25em;
  }
  .--small.--left > & {
    border-radius: 0.25em 0 0 0.25em;
  }
  .--small.--right > & {
    border-radius: 0 0.25em 0.25em 0;
  }
  .--bar {
    position: absolute;
    background: var(--blue-200);
    width: 1px;
    top: 0.5em;
    bottom: 0.5em;
  }
  .--bar-center {
    left: calc(50% - 0.5px);
  }
  .--bar-left {
    left: calc(50% - 3.5px);
  }
  .--bar-right {
    left: calc(50% + 2.5px);
  }
  /**
   * When the resized image is smaller, the bars:
   *
   * - get shorter
   * - get thinner
   * - two bars instead of three bars
   */
  .--small > & > .--bar {
    top: 0.25em;
    bottom: 0.25em;
  }
  .--small > & > .--bar-left {
    left: calc(50% - 2px);
  }
  .--small > & > .--bar-center {
    display: none;
  }
  .--small > & > .--bar-right {
    left: calc(50% + 1px);
  }
`
