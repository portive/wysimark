import React from "react"
import { Reset } from "~/lib/reset"
import { Layout } from "@/components/layout"
import styled from "@emotion/styled"

const $OrangeDiv = styled.div`
  background: orange;
`

/**
 * DO NOT DELETE:
 *
 * Useful to keep around if/when we need to test the Reset on newer versions of
 * Emotion.
 *
 * This page tests whether our CSS Reset successfully resets the Zurb foundation
 * CSS framework.
 */
export default function Page() {
  return (
    <Layout>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/foundation-sites@6.6.3/dist/css/foundation.min.css"
        // eslint-disable-next-line no-secrets/no-secrets
        integrity="sha256-ogmFxjqiTMnZhxCqVmcqTvjfe1Y/ec4WaRj/aQPvn+I="
        crossOrigin="anonymous"
      ></link>
      <h2>Zurb Foundation Reset Test</h2>
      <p>
        This page has Zurb Foundation loaded so that we can test the CSS Reset
        on the children. If the children are not showing styling, then the reset
        has been successful.
      </p>
      <Reset>
        <div style={{ width: 480 }}>
          <h1>This should not be styled as an H1</h1>
          <$OrangeDiv>This should be orange</$OrangeDiv>
        </div>
      </Reset>
    </Layout>
  )
}
