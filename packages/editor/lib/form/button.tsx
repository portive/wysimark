import React from "react"
import { ElementProps } from "~/lib/ts-utils"
import styled from "@emotion/styled"
import { Style } from "./styles"

export const $Button = styled.button`
  /* display: inline-block not necessary for a button element but we also
   * style a div for use in Form.File which does need this.
   */
  display: inline-block;

  background-color: #1b7eea;
  background-image: linear-gradient(180deg, #068dff 0%, #007bf8 100%);
  border-radius: 5px;
  border-radius: 5px;
  border: 1px solid #007bf8;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  line-height: 34px;
  padding: 0 24px;
  &:focus {
    ${Style.Focus}
  }
  &:hover {
    filter: brightness(107%);
  }
  &:active {
    ${Style.Focus}
  }
  .fa {
    margin-right: 0.25em;
  }
`

type ButtonProps = ElementProps<HTMLButtonElement>

export function Button(props: ButtonProps) {
  return <$Button {...props} />
}

export const Buttons = styled.div`
  margin-top: 24px;
`
