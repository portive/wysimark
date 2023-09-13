import styled from "@emotion/styled"

export const $FormGroup = styled("div")`
  margin: 0.5em 0;
  &:first-of-type {
    margin-top: 0;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`

export const $FormCaption = styled("div")`
  font-size: 0.9375em;
  margin-bottom: 0.25em;
  color: var(--shade-700);
`

export const $FormHint = styled("div")`
  font-size: 0.875em;
  margin-top: 0.25em;
  color: var(--shade-500);
`

export const $Textarea = styled("input")`
  box-sizing: border-box;
  width: 100%;
  height: 6em;
  padding: 0.5em 0.75em;
  border-radius: 0.25em;
  color: var(--shade-700);
  font-family: inherit;
  border: 1px solid var(--shade-300);
  font-size: 0.9375em;
  &:focus {
    outline: 2px solid var(--blue-200);
  }
`

export const $Input = styled("input")`
  box-sizing: border-box;
  width: 100%;
  padding: 0.5em 0.75em;
  border-radius: 0.25em;
  color: var(--shade-700);
  border: 1px solid var(--shade-300);
  font-size: 0.9375em;
  &:focus {
    outline: 2px solid var(--blue-200);
  }
`

export const $BaseButton = styled("div")`
  /* Center vertically and horizontally */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.25em 0.75em;
  text-align: center;
  transition: all 100ms;
  border-radius: 0.25em;
  svg {
    font-size: 1.25em;
    stroke-width: 2px;
  }
`

export const $PrimaryButton = styled($BaseButton)`
  color: var(--blue-50);
  background: var(--blue-500);
  outline: 0px solid white;
  &:hover {
    color: white;
    background: var(--blue-600);
    outline: 2px solid var(--blue-200);
  }
  svg {
    color: var(--blue-200);
  }
`

export const $CancelButton = styled($BaseButton)`
  color: var(--shade-500);
  background: var(--shade-200);
  outline: 0px solid white;
  &:hover {
    color: var(--shade-600);
    background: var(--shade-300);
    outline: 2px solid var(--shade-200);
  }
  svg {
    color: var(--shade-400);
  }
`
