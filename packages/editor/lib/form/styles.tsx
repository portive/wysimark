import { css } from "@emotion/core"

const Focus = css`
  border-color: #80bdff;
  border: 1px solid rgb(128, 189, 255);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  outline: none;
`

export const InputBox = css`
  background-color: rgb(250, 251, 252);
  border-radius: 4px;
  border: 1px solid rgb(206, 212, 218);
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
  color: rgb(73, 80, 87);
  font-size: 14px;
  line-height: 36px;
  padding: 0 12px;
  width: 100%;
  /**
   * Added this to override "user-select: none" because I wasn't able to get
   * a focus in the input for HabitStack for the link modal. But it works
   * everywhere else and this change didn't fix this issue. 
   *
   * So, I don't think this does anything but I'm leaving it for now.
   *
   * If we fix the HabitStack issue, try removing this and if it still works
   * then we should remove the code below.
   */
  user-select: text;
  &:focus {
    ${Focus}
  }
  &::placeholder {
    font-style: italic;
    color: rgba(0, 0, 0, 0.2);
  }
`

export const Style = { Focus, InputBox }
