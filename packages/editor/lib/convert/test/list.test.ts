import { RootBlockElement } from "~/editor/types"
import { roundtrip, testParse } from "./convert-test-utils"

describe("lists", () => {
  it("should handle one list item", () => {
    const blocks: RootBlockElement[] = [
      {
        type: "unordered-list-item",
        depth: 0,
        children: [{ text: "item" }],
      },
    ]
    const markdown = `- item`
    const text = "* item"
    roundtrip(blocks, { markdown, text })
  })

  it("should parse a list item with no content", async () => {
    const blocks: RootBlockElement[] = [
      {
        type: "unordered-list-item",
        depth: 0,
        children: [{ text: "" }],
      },
    ]
    const markdown = `- &ZeroWidthSpace;`
    const text = `*`
    roundtrip(blocks, { markdown, text })
  })

  it("should handle heading in list but ignore the heading formatting", () => {
    const markdown = `- # item`
    const blocks: RootBlockElement[] = [
      {
        type: "unordered-list-item",
        depth: 0,
        children: [{ text: "item" }],
      },
      { type: "p", children: [{ text: "" }] },
    ]
    testParse(markdown, blocks)
  })

  /**
   * Note that the depth is 1 for a nested list
   */
  it("should handle list in a list", async () => {
    const markdown = `1. - item`
    const blocks: RootBlockElement[] = [
      {
        type: "unordered-list-item",
        depth: 1,
        children: [{ text: "item" }],
      },
      { type: "p", children: [{ text: "" }] },
    ]
    testParse(markdown, blocks)
  })

  it("should handle indented lists", () => {
    const blocks: RootBlockElement[] = [
      {
        type: "unordered-list-item",
        depth: 0,
        children: [{ text: "1" }],
      },
      {
        type: "unordered-list-item",
        depth: 1,
        children: [{ text: "2" }],
      },
    ]
    const markdown = `- 1

   - 2`
    const text = "* 1\n\n* 2"
    roundtrip(blocks, { markdown, text })
  })

  it("should handle blockquote in list by keeping its children", () => {
    const blocks: RootBlockElement[] = [
      {
        type: "unordered-list-item",
        depth: 0,
        children: [{ text: "1" }],
      },
      { type: "p", children: [{ text: "" }] },
    ]
    const markdown = `- > 1`
    testParse(markdown, blocks)
  })

  it("should handle blockquote in list by keeping its children even with many children", () => {
    const blocks: RootBlockElement[] = [
      {
        type: "unordered-list-item",
        depth: 0,
        children: [{ text: "1" }],
      },
      {
        type: "unordered-list-item",
        depth: 0,
        children: [{ text: "2" }],
      },
      { type: "p", children: [{ text: "" }] },
    ]
    const markdown = `- > 1\n  >\n  > 2`
    testParse(markdown, blocks)
  })

  it("should handle a table in a list by flattening the table", async () => {
    const blocks: RootBlockElement[] = [
      {
        type: "unordered-list-item",
        depth: 0,
        children: [{ text: "abcdef" }],
      },
      { type: "p", children: [{ text: "" }] },
    ]
    const markdown = `- |a|b|c|
  |--|--|--|
  |d|e|f|`
    testParse(markdown, blocks)
  })

  it("should handle code in a list by flattening the code", async () => {
    const blocks: RootBlockElement[] = [
      {
        type: "unordered-list-item",
        depth: 0,
        children: [{ text: "function nop() {}" }],
      },
      { type: "p", children: [{ text: "" }] },
    ]
    const markdown = `- \`\`\`
  function nop() {}
  \`\`\``
    testParse(markdown, blocks)
  })

  it("should handle thematic break in list by removing it", async () => {
    const blocks: RootBlockElement[] = [
      {
        type: "unordered-list-item",
        depth: 0,
        children: [{ text: "abc" }],
      },
      { type: "p", children: [{ text: "" }] },
    ]
    const markdown = `* abc\n* ---`
    testParse(markdown, blocks)
  })

  it("should handle badly indented items by ignoring overindented but respecting later indents still", () => {
    const markdown = `- 0
    - 2
  - 1
    - 2
    - 2`
    const blocks: RootBlockElement[] = [
      { type: "unordered-list-item", depth: 0, children: [{ text: "0" }] },
      { type: "unordered-list-item", depth: 1, children: [{ text: "2" }] },
      { type: "unordered-list-item", depth: 1, children: [{ text: "1" }] },
      { type: "unordered-list-item", depth: 2, children: [{ text: "2" }] },
      { type: "unordered-list-item", depth: 2, children: [{ text: "2" }] },
      { type: "p", children: [{ text: "" }] },
    ]
    testParse(markdown, blocks)
  })

  it("should handle mixed lists", () => {
    const blocks: RootBlockElement[] = [
      {
        type: "unordered-list-item",
        depth: 0,
        children: [{ text: "item" }],
      },
      {
        type: "task-list-item",
        checked: false,
        depth: 1,
        children: [{ text: "unchecked" }],
      },
      {
        type: "task-list-item",
        checked: true,
        depth: 0,
        children: [{ text: "checked" }],
      },
    ]
    const markdown = `- item

   - [ ] unchecked

- [x] checked`
    const text = "* item\n\n[ ] unchecked\n\n[x] checked"

    roundtrip(blocks, { markdown, text })
  })

  it("should handle mixed markers", () => {
    const markdown = `+ Create a list
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!`
    const blocks: RootBlockElement[] = [
      {
        type: "unordered-list-item",
        depth: 0,
        children: [{ text: "Create a list" }],
      },
      {
        type: "unordered-list-item",
        depth: 0,
        children: [{ text: "Sub-lists are made by indenting 2 spaces:" }],
      },
      {
        type: "unordered-list-item",
        depth: 1,
        children: [
          {
            text: "Marker character change forces new list start:",
          },
        ],
      },
      {
        type: "unordered-list-item",
        depth: 2,
        children: [{ text: "Ac tristique libero volutpat at" }],
      },
      {
        type: "unordered-list-item",
        depth: 2,
        children: [{ text: "Facilisis in pretium nisl aliquet" }],
      },
      {
        type: "unordered-list-item",
        depth: 2,
        children: [{ text: "Nulla volutpat aliquam velit" }],
      },
      {
        type: "unordered-list-item",
        depth: 0,
        children: [{ text: "Very easy!" }],
      },
      { type: "p", children: [{ text: "" }] },
    ]
    testParse(markdown, blocks)
  })

  it("should handle an empty list", () => {
    const blocks: RootBlockElement[] = [
      {
        type: "unordered-list-item",
        depth: 0,
        children: [{ text: "" }],
      },
      {
        type: "unordered-list-item",
        depth: 1,
        children: [{ text: "" }],
      },
    ]
    const markdown = `- &ZeroWidthSpace;\n\n   - &ZeroWidthSpace;`
    const text = "* \n\n*"
    roundtrip(blocks, { markdown, text })
  })

  it("should handle a too much indented item", async () => {
    /**
     * TODO:
     * I think this needs to be fixed structurally. List elements in the editor
     * should be nested, just like they are in normal HTML code.
     */
    const blocks: RootBlockElement[] = [
      {
        type: "unordered-list-item",
        depth: 2,
        children: [{ text: "item" }],
      },
      {
        type: "unordered-list-item",
        depth: 2,
        children: [{ text: "item" }],
      },
    ]
    const markdown = `- item\n\n   - item`
    const text = "* item\n\n* item"
    const reblocks: RootBlockElement[] = [
      {
        type: "unordered-list-item",
        depth: 0,
        children: [{ text: "item" }],
      },
      {
        type: "unordered-list-item",
        depth: 1,
        children: [{ text: "item" }],
      },
    ]
    roundtrip(blocks, { markdown, text }, reblocks)
  })

  it("should handle strikethrough text", async () => {
    const blocks: RootBlockElement[] = [
      {
        type: "task-list-item",
        depth: 2,
        checked: false,
        children: [
          {
            del: true,
            text: "Recent books up to 10. Then show more. ",
          },
          {
            del: true,
            bold: true,
            text: "Recently viewed books",
          },
        ],
      },
    ]
    const markdown =
      "- [ ] ~~Recent books up to 10\\. Then show more\\. **Recently viewed books**~~"
    const text =
      "[ ] Recent books up to 10. Then show more. Recently viewed books"
    roundtrip(blocks, { markdown, text }, [
      {
        type: "task-list-item",
        depth: 0,
        checked: false,
        children: [
          {
            text: "Recent books up to 10. Then show more. ",
            del: true,
          },
          {
            text: "Recently viewed books",
            del: true,
            bold: true,
          },
        ],
      },
    ])
  })
})
