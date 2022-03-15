import { useCallback, useEffect } from "react"
import { OnChange, createWysimark } from "@wysimark/standalone"

export default function Page() {
  /**
   * Callback for when there is a change in the Wysimark component
   */
  const onChange = useCallback<OnChange>((event) => {
    const textarea = document.getElementById("textarea") as HTMLTextAreaElement
    textarea.value = event.getMarkdown()
  }, [])

  useEffect(() => {
    const element = document.getElementById("wysimark")
    if (element === null) {
      throw new Error(`Expected element to be defined`)
    }
    const wysimark = createWysimark(element, {
      initialMarkdown: "Hello world",
      onChange,
    })

    return function unmount() {
      wysimark.unmount()
    }
  }, [onChange])

  return (
    <div style={{ width: 640, margin: "1em auto" }}>
      <div id="wysimark" />
      <textarea
        id="textarea"
        style={{ width: 640, marginTop: 16, height: 240 }}
      />
    </div>
  )
}
