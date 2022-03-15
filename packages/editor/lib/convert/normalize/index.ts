import { CodeBlockElement, RootBlockElement, Segment } from "~/editor/types"
import { isTextSegment } from "../serialize/serialize-utils"
import { normalizeCode } from "./normalize-code"
import { normalizeLine } from "./normalize-line"

/**
 * When normalizing blocks, we do it in a nested way which is not easy to
 * fit into the strict types so we loosen up the restrictions a little.
 *
 * In the end, we know that the input types are correct, so after we process
 * we cast the top level into RootBlockElement
 */
type BlockLike = {
  type?: string
  children?: BlockLike[]
  [key: string]: any
}

function isBlockType(block: BlockLike, types: string[]): boolean {
  return (
    Object.prototype.hasOwnProperty.call(block, "type") &&
    !!block.type &&
    types.includes(block.type)
  )
}

/**
 * FIXME:
 *
 * Could be valuable to move this into `editor/types`. Maybe an `isLeafElement`
 * method.
 */
const TYPES_WITH_LINE_CHILDREN = [
  "p",
  "heading",
  "ordered-list-item",
  "unordered-list-item",
  "task-list-item",
]

/**
 * Is the children of the block a Line
 */
function hasLineChildren(block: BlockLike) {
  return isBlockType(block, TYPES_WITH_LINE_CHILDREN)
}

const VOID_TYPES = ["hr", "media"]

/**
 * Is the block a void block type
 */
function isVoidBlock(block: BlockLike) {
  return isBlockType(block, VOID_TYPES)
}

/**
 * Takes an array of blocks at any position in the document and normalizes it.
 * We use a `BlockLike` type in order to work around the restrictions of
 * using the exact correct types.
 */
function normalizeBlocks(
  blocks: BlockLike[],
  processSegments: (segments: Segment[]) => Segment[]
): BlockLike[] {
  const nextBlocks: any[] = []
  for (const block of blocks) {
    if (hasLineChildren(block)) {
      /**
       * Normalize blocks where the children are known to be a standard line
       * with segments
       */
      nextBlocks.push({
        ...block,
        children: processSegments(block.children as Segment[]),
      })
    } else if (isVoidBlock(block)) {
      /**
       * Don't normalize void blocks
       */
      nextBlocks.push(block)
    } else if (block.type === "code-block") {
      /**
       * Normalize code block
       */
      nextBlocks.push(normalizeCode(block as CodeBlockElement))
    } else if (
      Object.prototype.hasOwnProperty.call(block, "children") &&
      block.children
    ) {
      /**
       * Normalize blocks with children by normalizing their children with
       * the same generic algorithm
       */
      nextBlocks.push({
        ...block,
        children: normalizeBlocks(block.children, processSegments),
      })
    }
  }
  return nextBlocks
}

/**
 * Is this a paragraph type block with no text in it
 */
function isEmptyParagraph(block: RootBlockElement): boolean {
  if (block.type !== "p") return false
  if (block.children.length !== 1) return false
  const segment = block.children[0]
  if (!isTextSegment(segment)) return false
  return segment.text === ""
}

/**
 * Remove any empty trailing paragraphs
 */
function trimTrailingBlocks(blocks: RootBlockElement[]): RootBlockElement[] {
  const nextBlocks = [...blocks]
  for (let i = nextBlocks.length - 1; i >= 1; i--) {
    if (!isEmptyParagraph(nextBlocks[i])) break
    nextBlocks.splice(i, 1)
  }
  return nextBlocks
}

/**
 * Takes a document and returns a normalized version of it that is ready for
 * turning into markdown.
 *
 * Notably, if you convert this to markdown and then turn the markdown back
 * into a document, it should equal this normalized version of the document.
 */
export function normalize(blocks: RootBlockElement[]): RootBlockElement[] {
  const normalizedBlocks = normalizeBlocks(
    blocks,
    normalizeLine
  ) as RootBlockElement[]
  const trimmedBlocks = trimTrailingBlocks(normalizedBlocks)
  return trimmedBlocks
}
