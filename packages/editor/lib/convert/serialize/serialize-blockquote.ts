import { BlockquoteElement } from "~/editor/types"
import { serializeBlocks } from "./serialize-blocks"

export function serializeBlockquote(block: BlockquoteElement) {
  const innerParts = serializeBlocks(block.children)
  const outerParts = innerParts.map((part, index) => {
    let { markdown } = part
    if (index === 0) {
      /**
       * Add the first blockquote character
       */
      markdown = `> ${markdown}`
    }
    if (index === innerParts.length - 1) {
      /**
       * If we are in the last part, we don't need blockquote characters
       * on the trailing newlines because that will affect the following
       * blocks instead of the current one.
       */
      const matches = markdown.match(/^(.*?)(\n*)$/)
      if (matches == null) throw new Error(`This should always match`)
      markdown = `${matches[1].replace(/(\n)/g, "\n> ")}${matches[2]}`
    } else {
      markdown = markdown.replace(/(\n)/g, "\n> ")
    }
    return { ...part, markdown }
  })
  return outerParts
}
