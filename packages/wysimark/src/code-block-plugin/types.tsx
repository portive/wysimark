import { Text } from "slate"

import { createCodeBlockMethods } from "./methods"

type CodeBlockMethods = ReturnType<typeof createCodeBlockMethods>

export type CodeBlockEditor = {
  codeBlock: CodeBlockMethods
}

export type CodeBlockElement = {
  type: "code-block"
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
