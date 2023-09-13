import styled from "@emotion/styled"

export const $DialogButton = styled("div")`
  /* Center vertically and horizontally */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* font-size: 1.25em; */
  padding: 0.25em 0.75em;
  text-align: center;
  color: var(--blue-100);
  color: white;
  background: var(--blue-500);
  transition: all 100ms;
  &:hover {
    color: var(--blue-50);
    background: var(--blue-600);
    outline: 2px solid var(--blue-200);
  }
  border-radius: 0.25em;
  svg {
    color: var(--blue-200);
    font-size: 1.25em;
    stroke-width: 2px;
  }
`

export const $DialogHint = styled("div")`
  font-size: 0.875em;
  margin-top: 0.5em;
  color: var(--shade-500);
  line-height: 1.375;
`
