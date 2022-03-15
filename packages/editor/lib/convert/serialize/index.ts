import { RootBlockElement } from "~/editor/types"
import { Part } from "../convert-types"
import { normalize } from "../normalize"
import { serializeBlocks } from "./serialize-blocks"

/**
 * The return type of serialized blocks.
 *
 * Includes markdown and text but may also include things like taskCount,
 * checkedTaskCount and uncheckedTaskCount in the future.
 */
type SerializeData = {
  markdown: string
  text: string
}

/**
 * Takes an array of parts and turns it into the serialized data with markdown
 * and text.
 */
function extractFromParts(parts: Part[]): SerializeData {
  const markdown = parts
    .map((part) => part.markdown)
    .join("")
    .trim()
  const text = parts
    .map((part) => part.string)
    .join("")
    .trim()
  return { markdown, text }
}

/**
 * Takes a document and serializes it into markdown and text
 */
export function serialize(blocks: RootBlockElement[]): SerializeData {
  try {
    const normalizedBlocks = normalize(blocks)
    const parts = serializeBlocks(normalizedBlocks)
    const data = extractFromParts(parts)
    return data
  } catch (e) {
    console.log("Error in serialize of these blocks")
    console.log(blocks)
    throw e
  }
}
