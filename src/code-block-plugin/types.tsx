import { BaseText, Text } from "slate"

export type CodeBlockEditor = {
  supportsCodeBlock: true
}

export type CodeBlockLineElement = {
  type: "code-block-line"
  children: Text[]
}

export type CodeBlockElement = {
  type: "code-block"
  language: string
  children: CodeBlockLineElement[]
}

export type CodeBlockPluginCustomTypes = {
  Name: "code-block"
  Editor: CodeBlockEditor
  Element: CodeBlockElement | CodeBlockLineElement
  Text: BaseText & { prismToken?: string }
}
