import { styled } from "goober"
import { forwardRef } from "react"

import { MyEditor } from "../components/my-editor"

const $Page = styled("div", forwardRef)`
  max-width: 720px;
  margin: 4em auto;
`

const Index = () => {
  return (
    <$Page>
      <MyEditor />
    </$Page>
  )
}

export default Index
