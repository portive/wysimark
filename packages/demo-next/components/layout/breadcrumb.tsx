import Link from "next/link"
import styled from "@emotion/styled"

const $Bar = styled.div`
  background: #203040;
  color: rgba(255, 255, 255, 0.8);
  padding: 0.5em;
  a {
    color: rgba(255, 255, 255, 0.8);
  }
`

export function Breadcrumb() {
  return (
    <$Bar>
      <Link href="/">
        <a>🏠 Home</a>
      </Link>
    </$Bar>
  )
}
