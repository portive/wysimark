import { styled } from "goober"
import { forwardRef } from "react"

export const $ImageResizeInvisibleHandle = styled("div", forwardRef)`
  position: absolute;
  display: block;
  background: rgba(127, 127, 127, 0.001);
  top: 0;
  right: calc(-1em - 2px);
  /* transition: right 250ms;
  &.--offset {
    right: calc(-1em - 6px);
  } */
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
  /* &::before {
    content: "";
    position: absolute;
    background: var(--select-color);
    width: 2px;
    left: calc(1em - 1px);
    top: 0.5em;
    bottom: 0.5em;
    z-index: 1;
  } */
`
const $ImageResizeHandleBase = styled("div", forwardRef)`
  position: absolute;
  display: block;
  /* :hover > & {
    background: var(--blue-500);
  } */
  /* .--dragging > & {
    background: var(--blue-500);
  } */
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
    height: 1em;
    margin-top: -0.5em;
  }
  .--small.--center > & {
    left: 0.625em;
    width: 0.75em;
    border-radius: 0.25em;
  }
  .--small.--left > & {
    border-radius: 0.25em 0 0 0.25em;
    left: calc(0.125em + 1px);
  }
  .--small.--right > & {
    border-radius: 0 0.25em 0.25em 0;
    width: 0.75em;
    left: calc(50% - 1px);
  }
  .--bar {
    position: absolute;
    background: var(--blue-200);
    width: 1px;
    top: 0.5em;
    bottom: 0.5em;
  }
  .--small > & > .--bar {
    top: 0.25em;
    bottom: 0.25em;
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
`
