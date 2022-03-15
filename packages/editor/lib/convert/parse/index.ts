import { BlockElement, RootBlockElement, isFlushElement } from "~/editor/types"
import { assertUnreachable } from "~/lib/assert-unreachable"
import * as Mdast from "../mdast"
import { parseAst } from "./parse-ast"
import { parseBlockquote } from "./parse-blockquote"
import {
  parseCodeBlockNode,
  parseHtmlBlockNode,
} from "./parse-code-and-html-block"
import { parseHeadingNode } from "./parse-heading"
import { parseListNode } from "./parse-list"
import { parseMediaNode } from "./parse-media"
import { parseParagraphNode } from "./parse-paragraph"
import { parseTableNode } from "./parse-table"
import { parseThematicBreakNode } from "./parse-thematic-break"

export type TopLevelContent = Mdast.TopLevelContent | Mdast.Image

/**
 * Takes an Mdast node and turns it into a slate block
 */
function parseRootNode(node: TopLevelContent): RootBlockElement[] {
  switch (node.type) {
    case "blockquote":
      return [parseBlockquote(node)]
    case "heading":
      return [parseHeadingNode(node)]
    case "paragraph":
      return [parseParagraphNode(node)]
    case "thematicBreak":
      return [parseThematicBreakNode(node)]
    case "code":
      return [parseCodeBlockNode(node)]
    case "html":
      return [parseHtmlBlockNode(node)]
    case "image":
      return [parseMediaNode(node)]
    case "list":
      return parseListNode(node, { depth: 0 })
    case "table":
      return [parseTableNode(node)]
    /**
     * This shouldn't happen because remark-inline-links should remove definitions
     *
     * Also ignore yaml front matter as it doesn't appear to get generated.
     * Looks like you need to use `remark-frontmatter` plugin.
     */
    case "definition":
    case "footnoteDefinition":
    case "yaml":
      return []
    default:
      assertUnreachable(node)
  }
}

/**
 * Parse the root nodes `Mdast.Content[]`
 *
 * WARNING:
 * TODO:
 * This method is incorrectly named at the moment. It is used to parseRootNotes
 * but it is also used, at the moment, to parse the children of a blockquote.
 * We should probably rename this to something like `parseRootOrQuoteNodes`
 * to make this more clear.
 */
export function parseRootNodes(nodes: TopLevelContent[]): RootBlockElement[] {
  const blocks: RootBlockElement[] = []
  for (const node of nodes) {
    blocks.push(...parseRootNode(node))
  }
  return blocks
}

/**
 * Takes an array of root blocks at the very top of the AST and adds an empty
 * paragraph if the last block isn't a flush element like a `heading` or a `p`.
 */
export function normalizeRootBlocks(
  blocks: RootBlockElement[]
): RootBlockElement[] {
  const lastBlock = blocks[blocks.length - 1]
  if (isFlushElement(lastBlock)) return blocks
  return [...blocks, { type: "p", children: [{ text: "" }] }]
}

/**
 * If there are no blocks, make sure there is at least one empty paragraph block
 */
function normalizeEmptyBlocks<T extends BlockElement>(blocks: T[]): T[] {
  if (blocks.length > 0) {
    return blocks
  }
  return [{ type: "p", children: [{ text: "" }] }] as T[]
}

/**
 * Takes markdown and returns a Slate Document
 */
export function parse(markdown: string) {
  const rootNodes = parseAst(markdown)
  const rootBlocks = normalizeRootBlocks(parseRootNodes(rootNodes))
  const normalizedBlocks = normalizeEmptyBlocks(rootBlocks)
  return normalizedBlocks
}
