import { styled } from "goober"
import { forwardRef } from "react"

export const $Heading = styled("h1", forwardRef)`
  &:first-child {
    margin-top: 0;
  }
`
