import { createWysimark } from "@wysimark/js"

console.log("Hello from main.js!")

const container = document.getElementById("editor-container")
if (container == null) throw new Error("Could not find editor container")
const wysimark = createWysimark(container, {
  initialMarkdown: "# Hello World\n\nLorem ipsum dolar.",
})

document.getElementById("get-markdown")?.addEventListener("click", () => {
  console.log(wysimark.getMarkdown())
})

document.getElementById("set-markdown")?.addEventListener("click", () => {
  wysimark.setMarkdown("")
})
