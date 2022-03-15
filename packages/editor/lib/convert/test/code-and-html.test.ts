import { RootBlockElement } from "~/editor/types"
import { roundtrip, testParse } from "./convert-test-utils"

describe("code blocks and html", () => {
  it("should handle code blocks", () => {
    const blocks: RootBlockElement[] = [
      {
        type: "code-block",
        language: "js",
        children: [
          {
            type: "code-line",
            children: [{ text: "function () " }, { text: "{" }],
          },
          {
            type: "code-line",
            children: [{ text: "  // " }, { text: "this is a comment" }],
          },
          { type: "code-line", children: [{ text: "}" }] },
        ],
      },
    ]
    const markdown = `\`\`\`js
function () {
  // this is a comment
}
\`\`\``
    const text = `function () {
  // this is a comment
}`
    roundtrip(blocks, { markdown, text })
  })

  it("should normalize reblocks that preserves spaces at the start and end of line in code", async () => {
    const blocks: RootBlockElement[] = [
      {
        type: "code-block",
        language: "js",
        children: [
          {
            type: "code-line",
            children: [{ text: "  spaces  " }],
          },
        ],
      },
    ]
    const markdown = `\`\`\`js
  spaces
\`\`\``
    const text = "spaces"
    roundtrip(blocks, { markdown, text })
  })

  it("should preserves spaces at the start not not end of line in code", async () => {
    const blocks: RootBlockElement[] = [
      {
        type: "code-block",
        language: "js",
        children: [
          {
            type: "code-line",
            children: [{ text: "function () " }, { text: "{" }],
          },
          {
            type: "code-line",
            children: [{ text: "  alert('hello')" }],
          },
          { type: "code-line", children: [{ text: "}" }] },
        ],
      },
    ]
    const markdown = "```js\nfunction () {\n  alert('hello')\n}\n```"
    const text = "function () {\n  alert('hello')\n}"
    roundtrip(blocks, { markdown, text })
  })

  it("should handle an empty code block", async () => {
    const blocks: RootBlockElement[] = [
      {
        type: "code-block",
        language: "js",
        children: [
          {
            type: "code-line",
            children: [{ text: "" }],
          },
        ],
      },
    ]
    const markdown = "```js\n\n```"
    const text = ""
    roundtrip(blocks, { markdown, text })
  })

  it("should handle empty codelines", async () => {
    const blocks: RootBlockElement[] = [
      {
        type: "code-block",
        language: "js",
        children: [
          { type: "code-line", children: [{ text: "" }] },
          { type: "code-line", children: [{ text: "" }] },
          { type: "code-line", children: [{ text: "" }] },
        ],
      },
    ]
    const markdown = "```js\n\n\n\n```"
    const text = ""
    roundtrip(blocks, { markdown, text })
  })

  it("should handle a code block where first and last backticks are right next to each other", async () => {
    const markdown = "```js\n```"
    const blocks: RootBlockElement[] = [
      {
        type: "code-block",
        language: "js",
        children: [
          {
            type: "code-line",
            children: [{ text: "" }],
          },
        ],
      },
      { type: "p", children: [{ text: "" }] },
    ]
    testParse(markdown, blocks)
  })

  it("should handle four backticks for code block in markdown", async () => {
    const markdown = "````js\nalert('hi')\n````"
    const blocks: RootBlockElement[] = [
      {
        type: "code-block",
        language: "js",
        children: [
          {
            type: "code-line",
            children: [{ text: "alert('hi')" }],
          },
        ],
      },
      { type: "p", children: [{ text: "" }] },
    ]
    testParse(markdown, blocks)
  })

  it("should handle three backticks in the code", async () => {
    /**
     * NOTE:
     * The way to handle it is if we have lines with three backticks in it,
     * we want to keep adding backticks until the backtick identifier is unique.
     */
    const blocks: RootBlockElement[] = [
      {
        type: "code-block",
        language: "js",
        children: [
          {
            type: "code-line",
            children: [{ text: "```" }],
          },
        ],
      },
    ]
    const markdown = "````js\n```\n````"
    const text = "```"
    roundtrip(blocks, { markdown, text })
  })

  /**
   * We turn inline HTML which is valid in markdown and turn it into visible code
   * blocks instead. The reason for this is that arbitrary HTML isn't possible
   * in React and even if it was, it's dangerous and shouldn't be allowed.
   *
   * But we don't want to just throw away a user's HTML code, so we just turn
   * it into visible code instead.
   *
   * TODO:
   * We should consider whether we want this as inline code which may make more
   * sense.
   */
  it("should handle HTML as code", () => {
    const markdown = `<h1>heading</h1>
  <p>paragraph</p>`
    const blocks: RootBlockElement[] = [
      {
        type: "code-block",
        language: "html",
        children: [
          { type: "code-line", children: [{ text: "<h1>heading</h1>" }] },
          { type: "code-line", children: [{ text: "  <p>paragraph</p>" }] },
        ],
      },
      { type: "p", children: [{ text: "" }] },
    ]
    testParse(markdown, blocks)
  })

  it("should handle inline HTML as code mark", async () => {
    const markdown = `this <b>bold</b> code`
    const blocks: RootBlockElement[] = [
      {
        type: "p",
        children: [
          { text: "this " },
          { text: "<b>", code: true },
          { text: "bold" },
          { text: "</b>", code: true },
          { text: " code" },
        ],
      },
    ]
    testParse(markdown, blocks)
  })

  it("should handle indented code after a paragraph", async () => {
    const markdown = `hello

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code`
    const blocks: RootBlockElement[] = [
      { type: "p", children: [{ text: "hello" }] },
      {
        type: "code-block",
        language: "text",
        children: [
          { type: "code-line", children: [{ text: "// Some comments" }] },
          { type: "code-line", children: [{ text: "line 1 of code" }] },
          { type: "code-line", children: [{ text: "line 2 of code" }] },
          { type: "code-line", children: [{ text: "line 3 of code" }] },
        ],
      },
      { type: "p", children: [{ text: "" }] },
    ]
    testParse(markdown, blocks)
  })

  it("should handle really messed up code block from markdown-it-demo", async () => {
    const markdown = `hello

        { some code, part of Definition 2 }

    Third paragraph of definition 2.`
    const blocks: RootBlockElement[] = [
      {
        type: "p",
        children: [{ text: "hello" }],
      },
      {
        type: "code-block",
        language: "text",
        children: [
          {
            type: "code-line",
            children: [{ text: "    { some code, part of Definition 2 }" }],
          },
          {
            type: "code-line",
            children: [{ text: "" }],
          },
          {
            type: "code-line",
            children: [{ text: "Third paragraph of definition 2." }],
          },
        ],
      },
      { type: "p", children: [{ text: "" }] },
    ]
    testParse(markdown, blocks)
  })

  it("should handle what looks like an empty indent block", async () => {
    const markdown = `hello

        `
    const blocks: RootBlockElement[] = [
      { type: "p", children: [{ text: "hello" }] },
    ]
    testParse(markdown, blocks)
  })
})
