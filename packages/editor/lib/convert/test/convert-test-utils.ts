import { ParagraphElement, RootBlockElement } from "~/editor/types"
import { log } from "~/lib/log"
import { normalize } from "../normalize"
import { parse } from "../parse"
import { parseAst } from "../parse/parse-ast"
import { serialize } from "../serialize"

/**
 * Helper to quickly create a paragraph block
 */
export function p(
  ...children: ParagraphElement["children"]
): ParagraphElement[] {
  const p: ParagraphElement = { type: "p", children }
  return [p]
}

/**
 * Get AST from markdown
 */
export function getAst(markdown: string): any {
  return parseAst(markdown)
}

/**
 * Test parsing of markdown to blocks
 */
export function testParse(
  markdown: string,
  expectedBlocks: RootBlockElement[]
) {
  const blocks = parse(markdown)
  try {
    expect(blocks).toEqual(expectedBlocks)
  } catch (e) {
    log("=== Failed parse Markdown to JSON ===")
    log("Input Markdown")
    log(markdown)
    log("Generated Blocks")
    log(blocks)
    log("Expected Blocks")
    log(expectedBlocks)
    throw e
  }
  return { generatedBlocks: blocks }
}

/**
 * Test serialization of blocks to markdown
 */
export function testSerialize(
  blocks: RootBlockElement[],
  expectedMarkdown: string
) {
  const data = serialize(blocks)
  try {
    expect(data.markdown).toEqual(expectedMarkdown)
  } catch (e) {
    const normalizedBlocks = normalize(blocks)
    log("=== Failed serialize JSON to Markdown ===")
    log("Input Blocks")
    log(blocks)
    log("Normalized Blocks")
    log(normalizedBlocks)
    log("Generated Markdown")
    log(data.markdown)
    log("Expected Markdown")
    log(expectedMarkdown)
    throw e
  }
  return data
}

/**
 * Test serializatioo to markdown and then back to blocks again
 */
export function roundtrip(
  blocks: RootBlockElement[],
  expected: { markdown: string; text?: string },
  // TODO: Make roundtrip conversion test actually check the roundtrip
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  expectedBlocks: RootBlockElement[] = normalize(blocks)
) {
  const { text } = testSerialize(blocks, expected.markdown)
  if (expected.text != null) {
    expect(text).toEqual(expected.text)
  }
}

/**
 * Test markdown to JSON and back again without crashing
 */
export function testParseAndSerialize(markdown: string) {
  const blocks = parse(markdown)
  serialize(blocks)
}
