import React from "react"
import { Breadcrumb } from "./breadcrumb"
import styled from "@emotion/styled"

const $Layout = styled.div`
  border: 0px none;
  font: 16px sans-serif;
`

const $Content = styled.div`
  padding: 1em;
`

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <$Layout>
      <Breadcrumb />
      <$Content>{children}</$Content>
    </$Layout>
  )
}
