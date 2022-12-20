import { styled } from "goober"
import { forwardRef } from "react"

export const $UploadAttachment = styled("span", forwardRef)`
  display: inline-block;
  border: 1px solid var(--shade-300);
  font-size: 0.875em;
  border-radius: 0.5em;
  cursor: pointer;
  overflow: clip;
  &:hover {
    border-color: var(--hover-color);
  }
  &.--selected {
    border-color: var(--select-color);
    outline: 1px solid var(--select-color);
  }
  .--flex {
    display: flex;
    align-items: stretch;
  }
  .--paperclip {
    display: flex;
    align-items: center;
    padding-left: 0.375em;
    padding-right: 0em;
    color: var(--shade-400);
  }
  .--title {
    padding: 0 0.25em;
    color: var(--shade-700);
  }
  .--download {
    padding: 0.25em;
    display: flex;
    align-items: center;
    user-select: none;
    color: var(--shade-500);
    &:hover {
      svg {
        stroke-width: 2px;
      }
      color: white;
      background: var(--select-color);
    }
  }
`
