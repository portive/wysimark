import { useEditor, Wysimark } from "@wysimark/react"

export default function Page() {
  const editor = useEditor({ initialValue: "# Hello World" })

  return (
    <div style={{ maxWidth: 720, margin: "2em auto" }}>
      <h1>Wysimark</h1>
      <button onClick={() => console.log(editor.getValue())}>Get</button>
      <button onClick={() => editor.resetValue("# Reset")}>Reset</button>
      <Wysimark wysimark={editor} style={{ maxHeight: 400 }} />
    </div>
  )
}
