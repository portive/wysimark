import { createWysimark } from "@wysimark/js/src"
import { useEffect, useRef } from "react"

type Wysimark = ReturnType<typeof createWysimark>

export default function Page() {
  const ref = useRef<Wysimark>()

  useEffect(() => {
    const containerElement = document.getElementById("main")
    if (containerElement == null) throw new Error("Container element not found")

    const wysimark = createWysimark(containerElement, {
      initialMarkdown: "# Hello World\n\nThis is the **Wysimark** editor.",
    })

    ref.current = wysimark
    return () => {
      setTimeout(() => {
        wysimark.unmount()
      })
    }
  }, [])
  return (
    <div>
      <h1>Standalone JavaScript Editor</h1>
      <button
        onClick={() => {
          console.log(ref.current?.getMarkdown())
        }}
      >
        getMarkdown
      </button>
      <button
        onClick={() => {
          console.log(ref.current?.setMarkdown("# Set Markdown"))
        }}
      >
        setMarkdown
      </button>
      <div id="main"></div>
    </div>
  )
}
