import { createWysimark } from "@wysimark/standalone"

/**
 * Get the editor container element
 */
const container = document.getElementById("editor-container")
if (container == null) throw new Error("Could not find editor container")

/**
 * Create the Wysimark component
 */
const wysimark = createWysimark(container, {
  initialMarkdown: "# Hello World\n\nLorem ipsum dolar.",
  placeholder: "Type something...",
  onChange: () => {
    const markdown = wysimark.getMarkdown()
    const textarea = document.getElementById("textarea")
    if (textarea == null) throw new Error("Could not find textarea")
    textarea.innerHTML = markdown
  },
})

/**
 * If "Get Markdown" is clicked log the markdown to console
 */
document.getElementById("get-markdown")?.addEventListener("click", () => {
  console.log(wysimark.getMarkdown())
})

/**
 * If "Set Markdown" is clicked, set the markdown to empty string
 */
document.getElementById("set-markdown")?.addEventListener("click", () => {
  wysimark.setMarkdown("")
})
