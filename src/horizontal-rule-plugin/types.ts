export type HorizontalRuleEditor = {
  supportsHorizontalRule: true
}

export type HorizontalRuleElement = {
  type: "horizontal-rule"
  children: [{ text: "" }]
}

export type HorizontalRulePluginCustomTypes = {
  Name: "horizontal-rule"
  Editor: HorizontalRuleEditor
  Element: HorizontalRuleElement
}
