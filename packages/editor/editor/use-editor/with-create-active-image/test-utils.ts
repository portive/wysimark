import { Editor } from "slate"

/**
 * A default minimal createEditor for testing purposes
 */
export function createEditor() {
  const editor = {
    createActiveImage(url: string) {
      return { type: "static", url }
    },
  } as Editor
  return editor
}
