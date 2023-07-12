import { createWysimark } from "@wysimark/standalone"

/**
 * Get the HTML elements
 */
const container = document.getElementById("editor-container")
if (container == null) throw new Error("Could not find editor container")

const textarea = document.getElementById(
  "textarea"
) as HTMLTextAreaElement | null
if (textarea == null) throw new Error("Could not find textarea")

const getMarkdownButton = document.getElementById("get-markdown")
if (!getMarkdownButton) throw new Error("Could not find get-markdown button")

const setMarkdownButton = document.getElementById("set-markdown")
if (!setMarkdownButton) throw new Error("Could not find set-markdown button")

const initialMarkdown = "# Hello World\n\nLorem ipsum dolar."

/**
 * Create the Wysimark component
 */
const wysimark = createWysimark(container, {
  initialMarkdown,
  placeholder: "Type something...",
  onChange: (markdown) => {
    if (textarea == null) throw new Error("Could not find textarea")
    textarea.value = markdown
  },
})

/**
 * Add event handlers to the textarea
 */
textarea.addEventListener("input", (e: Event) => {
  const target = e.target as HTMLTextAreaElement
  if (target == null) return
  wysimark.setMarkdown(target.value)
})

textarea.value = initialMarkdown

/**
 * If "Get Markdown" is clicked log the markdown to console
 */
getMarkdownButton.addEventListener("click", () => {
  console.log(wysimark.getMarkdown())
})

/**
 * If "Set Markdown" is clicked, set the markdown to empty string
 */
setMarkdownButton.addEventListener("click", () => {
  wysimark.setMarkdown("# Set the markdown\n\nLorem ipsum dolar.")
})
