import styled from "@emotion/styled"

export const $HorizontalRule = styled("hr")`
  position: relative;
  height: 1em;
  /* background-color: var(--hr-color); */
  margin: 1em 0;
  &::before {
    position: absolute;
    content: "";
    left: 0.125em;
    right: 0.125em;
    top: 50%;
    height: 1px;
    background-color: var(--hr-color);
    border-radius: 1px;
  }
  border-radius: 0.25em;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: rgba(0, 127, 255, 0.1);
    /* &::before {
      outline: 2px solid var(--hover-color);
    } */
  }
  &.--selected {
    background: none;
    &::before {
      outline: 2px solid var(--select-color, blue);
    }
  }
`
