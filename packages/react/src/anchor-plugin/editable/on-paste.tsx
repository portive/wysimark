import { Editor } from "slate"

export function onPaste(
  editor: Editor,
  e: React.ClipboardEvent<HTMLDivElement>
) {
  const clipboardData = e.clipboardData
  const { types } = clipboardData

  console.log(clipboardData.getData("text/html"))

  /**
   * We don't want to handle it if it's not just plain text. If it is
   * plain text, it will have only one type and it will be "text/plain".
   * HTML, for example, also has "text/plain" but also "text/html"
   */
  if (types.length > 1) return false
  if (types[0] !== "text/plain") return false

  /**
   * Check to make sure the text is a URL
   */
  const text = clipboardData.getData("text/plain")
  if (!isUrl(text)) return false

  /**
   * If it is a URL, then insert the link
   */
  e.preventDefault()
  e.stopPropagation()
  editor.anchor.insertLink(text)
  return true
}
function isUrl(s: string): boolean {
  let url
  try {
    url = new URL(s)
  } catch (_) {
    return false
  }
  return (
    url.protocol === "http:" ||
    url.protocol === "https:" ||
    url.protocol === "mailto:"
  )
}
