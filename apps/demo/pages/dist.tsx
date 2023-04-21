import { useWysimark, Wysimark } from "@wysimark/react"

export default function Page() {
  const wysimark = useWysimark({ initialValue: "# Hello World" })

  return (
    <div style={{ maxWidth: 720, margin: "2em auto" }}>
      <h1>Wysimark</h1>
      <button onClick={() => console.log(wysimark.getValue())}>Get</button>
      <button onClick={() => wysimark.resetValue("# Reset")}>Reset</button>
      <Wysimark wysimark={wysimark} style={{ maxHeight: 400 }} />
    </div>
  )
}
