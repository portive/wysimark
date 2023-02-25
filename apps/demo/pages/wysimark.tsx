import { useCallback } from "react"
import { useWysimark, Wysimark } from "wysimark/src/entry"

export default function Page() {
  const wysimark = useWysimark({ initialValue: "# Hello World" })

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
      <h1>Wysimark</h1>
      <button onClick={getValue}>Get</button>
      <button onClick={resetValue}>Reset</button>
      <Wysimark wysimark={wysimark} />
    </div>
  )
}
