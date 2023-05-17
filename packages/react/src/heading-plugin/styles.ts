import { css } from "@emotion/react"
import styled from "@emotion/styled"

const headingStyles = css`
  margin-top: 1em;
  &:first-child {
    margin-top: 0;
  }
  font-weight: bold;
`

export const $H1 = styled("h1")`
  ${headingStyles}
  font-size: 2.25em;
  letter-spacing: -0.01em;
`

export const $H2 = styled("h2")`
  ${headingStyles}
  font-size: 1.5em;
`

export const $H3 = styled("h3")`
  ${headingStyles}
  font-size: 1.25em;
`

export const $H4 = styled("h4")`
  ${headingStyles}
  font-size: 1em;
`

export const $H5 = styled("h5")`
  ${headingStyles}
  font-size: 1em;
`

export const $H6 = styled("h6")`
  ${headingStyles}
  font-size: 1em;
`
