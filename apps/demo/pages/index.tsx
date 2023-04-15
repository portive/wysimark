import { useCallback } from "react"
import { useWysimark, Wysimark } from "wysimark/src/entry"

import content from "../content/basic.md"

export default function Page() {
  const wysimark = useWysimark({
    initialValue: content,
    uploadAuthToken: process.env.NEXT_PUBLIC_PORTIVE_AUTH_TOKEN,
  })

  const getValue = useCallback(() => {
    const value = wysimark.getValue()
    console.log(value)
  }, [wysimark])

  const resetValue = useCallback(() => {
    wysimark.resetValue(`# This is a reset with the reset button
    
And this is a paragraph`)
  }, [wysimark])

  console.log(content)

  return (
    <div style={{ maxWidth: 720, margin: "2em auto" }}>
      <button onClick={getValue}>Get</button>
      <button onClick={resetValue}>Reset</button>
      <Wysimark wysimark={wysimark} />
    </div>
  )
}
