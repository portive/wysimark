import { UnstyledText } from "./text"

/**
 * Code Block Language types
 */

export type CodeLanguage = "text" | "html" | "css" | "js" | "clike"

/**
 * NOTE:
 * Dont' delete this yet. I think we want an export that describes all the
 * available code languages that we can import into a selection box for choosing
 * a language for a code block.
 */
export const CODE_LANGUAGE: CodeLanguage[] = [
  "text",
  "html",
  "css",
  "js",
  "clike",
]

/**
 * Code Block Element
 */

export type CodeBlockElement = {
  type: "code-block"
  language: CodeLanguage
  children: CodeLineElement[]
}

/**
 * Code Line in a Code Block Element
 */

export type CodeLineElement = {
  type: "code-line"
  children: UnstyledText[]
}
