import { Editor } from "slate"

export function onDrop(e: React.DragEvent, editor: Editor) {
  const { dataTransfer } = e
  if (dataTransfer.types.includes("Files")) {
    e.preventDefault()
    e.stopPropagation()
    editor.upload(dataTransfer.files)
  }
  return false
}
