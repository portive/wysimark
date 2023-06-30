import { Text } from "slate"

import { createCodeBlockMethods } from "./methods"

type CodeBlockMethods = ReturnType<typeof createCodeBlockMethods>

export type BuiltInLanguage =
  | "text"
  | "html"
  | "svg"
  | "markup"
  | "css"
  | "javascript"
  | "js"
  | "java"
  | "c"
  | "clike"

/**
 * Maps a number of supported or semi-supported syntax highlighting languages
 * to the built-in Prism languages.
 */
export const LanguageMap: Record<string, BuiltInLanguage> = {
  plain: "text",
  plaintext: "text",
  text: "text",
  txt: "text",
  html: "markup",
  mathml: "markup",
  svg: "markup",
  xml: "markup",
  ssml: "markup",
  atom: "markup",
  rss: "markup",
  css: "css",
  c: "clike",
  clike: "clike",
  "c#": "clike",
  "c++": "clike",
  java: "clike",
  javascript: "javascript",
  js: "javascript",
}

export const LanguageCaptionMap: Record<string, string> = {
  javascript: "Javascript",
  js: "Javascript",
}

export const LanguageList: BuiltInLanguage[] = [
  "text",
  "html",
  "css",
  "svg",
  "javascript",
  "java",
  "c",
]

export type CodeBlockEditor = {
  codeBlock: CodeBlockMethods
}

/**
 * The code block element is the root element of a code block.
 */
export type CodeBlockElement = {
  type: "code-block"
  /**
   * The language of the code block. Can accept any string because Markdown can
   * accept any string; however, the built-in Prism languages are defined in:
   * `BuiltInLanguage`
   */
  language: string
  children: CodeBlockLineElement[]
}

export type CodeBlockLineElement = {
  type: "code-block-line"
  children: Text[]
}

export type CodeBlockPluginCustomTypes = {
  Name: "code-block"
  Editor: CodeBlockEditor
  Element: CodeBlockElement | CodeBlockLineElement
  Text: { text: string; prismToken?: string }
}
