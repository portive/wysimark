import { CodeBlockElement, CodeLanguage, CodeLineElement } from "~/editor/types"
import * as Mdast from "../mdast"

/**
 * Map to the proper language for syntax highlighting
 */
const LANGUAGE_MAP: { [key: string]: CodeLanguage } = {
  text: "text",
  html: "html",
  xml: "html",
  css: "css",
  javascript: "js",
  js: "js",
  c: "clike",
  java: "clike",
  clike: "clike",
}

/**
 * Parse a code block
 */
export function parseCodeBlockNode(node: Mdast.Code): CodeBlockElement {
  const markdown = node.value
  const codelines: CodeLineElement[] = markdown
    .split("\n")
    .map((text) => ({ type: "code-line", children: [{ text: text }] }))
  const nodeLang = node.lang as string
  const language = LANGUAGE_MAP[nodeLang ? nodeLang : "text"] || "text"
  return {
    type: "code-block",
    language,
    children: codelines,
  }
}

/**
 * Parse a block of HTML such that it turns into code blocks.
 *
 * Technically, this means we don't support HTML. Pragmatically, we would never
 * want to support HTML as it means security holes everywhere.
 */
export function parseHtmlBlockNode(node: Mdast.HTML): CodeBlockElement {
  const codelines: CodeLineElement[] = node.value
    .split("\n")
    .map((text) => ({ type: "code-line", children: [{ text: text }] }))
  return { type: "code-block", language: "html", children: codelines }
}
