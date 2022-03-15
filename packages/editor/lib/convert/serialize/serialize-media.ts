import { MediaElement } from "~/editor/types"
import { Part } from "../convert-types"

/**
 * Serialize media block
 */
export function serializeMedia(block: MediaElement): Part {
  return {
    markdown: `![${block.alt}](${block.url})\n\n`,
    string: `${block.alt} (${block.url})`,
  }
}
