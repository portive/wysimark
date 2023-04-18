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

  return (
    <div style={{ maxWidth: 720, margin: "2em auto" }}>
      <div className="mb-2">
        <button className="btn btn-primary me-1" onClick={getValue}>
          Log Value
        </button>
        <button className="btn btn-primary" onClick={resetValue}>
          Reset Value
        </button>
      </div>
      <Wysimark wysimark={wysimark} />
    </div>
  )
}
