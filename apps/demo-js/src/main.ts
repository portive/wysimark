import { createWysimark } from "@wysimark/js"

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
  onChange: () => {
    const markdown = wysimark.getMarkdown()
    document.getElementById("textarea")!.innerHTML = markdown
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
