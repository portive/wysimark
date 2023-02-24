import { Wysimark } from "wysimark/src/entry"

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "2em auto" }}>
      <h1>Wysimark</h1>
      <Wysimark initialValue="# Hello World" />
    </div>
  )
}
