import { Editor } from "slate"

export function onDrop(e: React.DragEvent, editor: Editor): boolean {
  const { dataTransfer } = e
  if (dataTransfer.types.includes("Files")) {
    e.preventDefault()
    e.stopPropagation()
    if (editor.uploadOptions.type === "disabled") return true
    editor.upload(dataTransfer.files)
    return true
  }
  return false
}
