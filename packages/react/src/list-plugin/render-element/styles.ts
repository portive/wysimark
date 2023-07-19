import styled from "@emotion/styled"

import { isDebug } from "~/src/sink"

const $ListItem = styled("li")`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  list-style-position: outside;
  margin-left: calc(2em + var(--list-item-depth) * 2em);
`

export const $UnorderedListItem = styled($ListItem)`
  position: relative;
  list-style-type: none;
  .--list-item-icon {
    position: absolute;
    top: 0.25em;
    left: -1.375em;
    line-height: 1.5em;
    color: var(--shade-600);
  }
`

export const $OrderedListItem = styled($ListItem)`
  position: relative;
  list-style-type: none;
  counter-increment: var(--list-item-var);

  &.--first-at-depth {
    counter-reset: var(--list-item-var);
    /**
     * if isDebug is true, then show a highlight on list items that are marked
     * as the first at a given depth.
     */
    background: ${isDebug ? "rgba(0, 255, 0, 0.2)" : "inherit"};
  }

  &:before {
    position: absolute;
    content: counter(var(--list-item-var)) ".";
    top: 0;
    left: -2em;
    width: 1.5em;
    text-align: right;
    color: var(--shade-500);
    /* force numbers to be monospaced for better alignment */
    font-variant-numeric: tabular-nums;
  }
`

export const $TaskListItem = styled($ListItem)`
  position: relative;
  list-style-type: none;
  .--list-item-icon {
    position: absolute;
    top: 0.25em;
    left: -1.5em;
    line-height: 1.5em;
    color: var(--shade-300);
    .--checkmark {
      color: green;
      stroke-width: 3px;
    }
  }
`
