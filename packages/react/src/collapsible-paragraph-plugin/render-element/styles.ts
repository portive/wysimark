import styled from "@emotion/styled"

export const $Paragraph = styled("p")`
  padding: 0;
  margin: 1em 0;
  &:first-child {
    margin-top: 0;
  }

  transition: background-color 200ms, margin-top 200ms, padding-top 200ms,
    margin-bottom 200ms, padding-bottom 200ms, font-size 200ms;

  &.--collapsible&.--empty {
    font-size: 0.25em; /* font-size is collapsed to 1/4 of regular em */
    margin: -4em 0; /* margin grows to 3/4 of regular em leaving space */
    padding: 1em 0; /* this is kind of eye-balling it */
    border-radius: 1em;
    &:hover {
      background: rgba(0, 127, 255, 0.1);
      cursor: pointer;
    }
  }
  &.--collapsible&.--empty&.--selected {
    font-size: 1em;
    padding: 0;
    margin: 1em 0;
    &:hover {
      background: none;
      cursor: default;
    }
    border-radius: 8px;
  }
`
