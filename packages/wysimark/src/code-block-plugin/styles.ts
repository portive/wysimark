import { styled } from "goober"
import { forwardRef } from "react"

export const $CodeBlock = styled("pre", forwardRef)`
  position: relative;
  background: var(--code-block-bgcolor);
  margin: 1em 0;
  padding: 1.5em 1em 1.5em 1em;
  border-radius: 0.5em;
  border: 1px solid var(--code-block-border-color);
  code {
    font-family: "andale mono", AndaleMono, monospace;
    font-size: 0.825em;
  }
  counter-reset: line;
  &.--selected {
    outline: 2px solid var(--select-color);
  }
`

export const $CodeBlockLanguage = styled("span", forwardRef)`
  cursor: default;
  position: absolute;
  top: 0.25em;
  right: 0.5em;
  font-size: 0.75em;
  color: var(--shade-500);
`

export const $CodeLine = styled("div", forwardRef)`
  line-height: 1.5em;
  counter-increment: line;
  &.--selected {
    background-color: var(--shade-100);
  }
  &:before {
    content: counter(line);
    color: rgba(0, 0, 0, 0.25);
    border-right: 1px solid rgba(0, 0, 0, 0.05);
    margin-right: 1em;
    padding: 0em 1em 0 0;
    text-align: right;
    display: inline-block;
    width: 1.25em;
  }
`
