export type InlineCodeEditor = {
  inlineCode: {
    toggleInlineCode: () => void
  }
}

export type InlineCodeText = {
  text: string
  code?: true
}

export type InlineCodePluginCustomTypes = {
  Name: "inline-code"
  Editor: InlineCodeEditor
  Text: InlineCodeText
}
