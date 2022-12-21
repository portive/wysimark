import { styled } from "goober"
import Head from "next/head"
import { forwardRef } from "react"

import { MyEditor } from "~/components/my-editor"

const $Page = styled("div", forwardRef)`
  max-width: 720px;
  margin: 4em auto;
`

const Index = () => {
  return (
    <$Page>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          crossOrigin="anonymous"
        ></link>
      </Head>
      <MyEditor />
    </$Page>
  )
}

export default Index
