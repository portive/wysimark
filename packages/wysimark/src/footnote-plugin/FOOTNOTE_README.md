# Footnote

Footnotes are not a high priority as they are not a part of the current GitHub Flavored Markdown specification. Furthermore, anecdotally, it's not an often used feature of Markdown and is more appropriate for authoring paper documents.

- Generally, links are preferable
- Usage of footnotes may be non-intuitive in a non-page based editor like a word
  processor

That being said, if one day we decide to implement it, I've already created a design/UI approach that I like so I felt like I should document. For clarity, I wrote this design doc under the assumption that footnotes were required to meet the specification, but since they are not, I feel like energy is spent elsewhere.

## Design Document

### Types

There will be two element types:

- `footnote-ref`
- `footnote`

Their element types look something like

```typescript
type FootnoteRefElement = {
  type: "footnote-ref"
  id: "abcdefg"
  children: Segment[] // inlines
}

type Footnote = {
  type: "footnote"
  id: "abcdefg"
  children: TopLevelBlocks[] // blocks
}
```

### Implementation

When a user inserts a footnote by clicking on the insert footnote button

- Inserts a `footnote-ref` immediately at the cursor position. If there is a selection, inserts the `footnote-ref` at the end of the selection. By default, I think we want to number the footnote so the first inserted is `1`, the second `2` etc. We may wish to have a renumber footnotes features later to put them into ascending order.
- Also inserts a `footnote` at the bottom of the document.
- The screen scrolls to the bottom of the screen where the footnote is and inserts the cursor in the empty footnote.
- In the empty footnote, we get a placeholder that says something like "Type to add text to your footnote. Click the return arrow to go back to your footnote reference"
- When the user types, the placeholder is removed
- If the user deleted the `footnote-ref`, the `footnote` is also deleted
- If the user is in the `footnote` and hits backspace or delete, it deletes the footnote and also deletes the `footenote-ref`.
- When we delete, we need to scan the entire document looking for the matching `footnote` or `footnote-ref`. Remember that delete doesn't cause a normalize event like insert does so we may need to add additional logic to Slate's overrideable Editor method for delete.
