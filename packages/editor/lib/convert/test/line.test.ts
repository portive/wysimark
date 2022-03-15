import { RootBlockElement } from "~/editor/types"
import { p, roundtrip, testParse } from "./convert-test-utils"

describe("line", () => {
  /**
   * Make sure that children always has at least one node in it
   */
  it("should convert an empty line", async () => {
    const blocks: RootBlockElement[] = [{ type: "p", children: [{ text: "" }] }] //p({ text: "" })
    roundtrip(blocks, { markdown: "", text: "" })
  })

  it("should convert a simple line", async () => {
    const blocks = p({ text: "hi" })
    roundtrip(blocks, { markdown: "hi", text: "hi" })
  })

  it("should convert a simple line with two byats", async () => {
    const blocks = p({ text: "hi " }, { text: "there", bold: true })
    roundtrip(blocks, { markdown: "hi **there**", text: "hi there" })
  })

  it("should convert a mixed line", async () => {
    const blocks = p(
      { text: "hi ", del: true, italic: true, bold: true },
      { text: " there" }
    )
    const markdown = "**_~~hi~~_**  there"
    const text = "hi  there"
    roundtrip(blocks, { markdown, text })
  })

  it("should handle spaces at the beginning of a line without turning it into code block", async () => {
    const blocks = p({ text: "  hello" })
    const markdown = "hello"
    const text = "hello"
    roundtrip(blocks, { markdown, text })
  })

  it("should convert a code segment", async () => {
    const blocks = p(
      { text: "hi " },
      { text: "code", code: true },
      { text: " segment" }
    )
    const markdown = "hi `code` segment"
    const text = "hi code segment"
    roundtrip(blocks, { markdown, text })
  })

  it("should convert a code segment with marks in it", async () => {
    const blocks = p(
      { text: "hi " },
      { text: "code", bold: true, italic: true, code: true },
      { text: " segment" }
    )
    const markdown = "hi **_`code`_** segment"
    const text = "hi code segment"
    roundtrip(blocks, { markdown, text })
  })

  it("should convert a code segment with marks in and around it", async () => {
    const blocks = p(
      { text: "hi ", bold: true, italic: true },
      { text: "code", code: true, bold: true, italic: true },
      { text: " segment" }
    )
    const markdown = "**_hi `code`_** segment"
    const text = "hi code segment"
    roundtrip(blocks, { markdown, text })
  })

  it("should convert a strikethrough with a space at the ends of it", async () => {
    const blocks = p({ text: "hi ", del: true }, { text: "there" })
    const markdown = "~~hi~~ there"
    const text = "hi there"
    roundtrip(blocks, { markdown, text })
  })

  it("should parse advanced styling", () => {
    const blocks = p({
      text: "del",
      del: true,
    })
    const markdown = "~~del~~"
    const text = "del"
    roundtrip(blocks, { markdown, text })
  })

  it("should parse code and html as code", () => {
    const blocks = p(
      { text: "function () {}", code: true },
      { text: " and " },
      { text: "<p>", code: true, bold: true },
      { text: " tags" }
    )
    const markdown = "`function () {}` and **`<p>`** tags"
    const text = "function () {} and <p> tags"
    roundtrip(blocks, { markdown, text })
  })

  it("should handle a bold in a backtick", async () => {
    const blocks = p(
      { text: "code with ", code: true },
      { text: "bold", code: true, bold: true }
    )
    const markdown = "`code with `**`bold`**"
    const text = "code with bold"
    roundtrip(blocks, { markdown, text })
  })

  /**
   * TODO:
   * The text and not just markdown should return the backticks as well I think?
   */
  it("should handle backticks in a code mark by doubling the outer backticks", () => {
    const blocks = p({ text: "literal " }, { text: "`code`", code: true })
    const markdown = "literal `` `code` ``"
    const text = "literal `code`"
    roundtrip(blocks, { markdown, text })
  })

  /**
   * TODO:
   * Should handle an arbitrary number of backticks
   */
  it.skip("should handle double backticks in a code mark by tripling the outer backticks", () => {
    const blocks = p({ text: "literal " }, { text: "``code``", code: true })
    const markdown = "literal ``` ``code`` ```"
    const text = "literal ``code``"
    roundtrip(blocks, { markdown, text })
    // testParse(markdown, blocks)
  })

  /**
   * We shouldn't be merging code text like we would with other mark types
   */
  it("should convert two code marked words with a space between it", async () => {
    const blocks = p(
      { text: "alpha bravo", code: true },
      // {
      //   type: "code-segment",
      //   children: [{ text: "alpha bravo" }],
      // },
      { text: " " },
      // {
      //   type: "code-segment",
      //   children: [{ text: "charlie delta" }],
      // }
      { text: "charlie delta", code: true }
    )
    const markdown = "`alpha bravo` `charlie delta`"
    const text = "alpha bravo charlie delta"
    roundtrip(blocks, { markdown, text })
  })

  it("should handle newline inside of code", async () => {
    const blocks = p({
      text: "<pre>\n</pre>",
      code: true,

      // type: "code-segment",
      // children: [{ text: "<pre>\n</pre>" }],
    })
    const markdown = "`<pre>`<br>`</pre>`"
    const text = "<pre>\n</pre>"
    const reblocks: RootBlockElement[] = [
      {
        type: "p",
        children: [
          { text: "<pre>", code: true },
          // { type: "code-segment", children: [{ text: "<pre>" }] },
          { text: "\n" },
          { text: "</pre>", code: true },
          // { type: "code-segment", children: [{ text: "</pre>" }] },
        ],
      },
    ]
    roundtrip(blocks, { markdown, text }, reblocks)
  })

  it("should handle newline inside of code with surrounds", async () => {
    const blocks = p(
      { text: "alpha " },
      { text: "<pre>\n</pre>", code: true },
      { text: " bravo" }
    )
    const markdown = "alpha `<pre>`<br>`</pre>` bravo"
    const text = "alpha <pre>\n</pre> bravo"
    const reblocks: RootBlockElement[] = [
      {
        type: "p",
        children: [
          { text: "alpha " },
          { text: "<pre>", code: true },
          { text: "\n" },
          { text: "</pre>", code: true },
          { text: " bravo" },
        ],
      },
    ]
    roundtrip(blocks, { markdown, text }, reblocks)
  })

  it("should handle all the marks side by side separated by spaces sometimes", async () => {
    const blocks = p(
      { text: "normal " },
      { text: "bold ", bold: true },
      { text: "italic", italic: true },
      { text: "del across words", del: true },
      { text: "code ", code: true }
      // { type: "code-segment", children: [{ text: "code " }] }
    )
    const markdown = "normal **bold** _italic_~~del across words~~`code `"
    const text = "normal bold italicdel across wordscode"
    roundtrip(blocks, { markdown, text })
  })

  it("should handle all the marks side by side without spaces", async () => {
    const blocks = p(
      { text: "normal" },
      { text: "bold", bold: true },
      { text: "italic", italic: true },
      { text: "del across words", del: true },
      { text: "code", code: true }
    )
    const markdown = "normal**bold**_italic_~~del across words~~`code`"
    const text = "normalbolditalicdel across wordscode"
    roundtrip(blocks, { markdown, text })
  })

  it("should handle spaces inside edges of bold text", async () => {
    const blocks = p({ text: " bold ", bold: true })
    const markdown = "**bold**"
    const text = "bold"
    roundtrip(blocks, { markdown, text })
  })

  it("should handle spaces inside edges of bold text with surrounding text", async () => {
    const blocks = p(
      { text: "a" },
      { text: " bold ", bold: true },
      { text: "b" }
    )

    const markdown = "a **bold** b"
    const text = "a bold b"
    roundtrip(blocks, { markdown, text })
  })

  it("should handle nested marks properly", async () => {
    const blocks = p(
      { text: "alpha ", bold: true },
      { text: "bravo ", bold: true, italic: true },
      { text: "charlie", italic: true }
    )
    const markdown = "**alpha _bravo_** _charlie_"
    const text = "alpha bravo charlie"
    roundtrip(blocks, { markdown, text })
  })
})

describe("links", () => {
  it("should handle all the marks nested in a link", async () => {
    const blocks = p({
      type: "link",
      url: "https://www.google.com/",
      children: [
        { text: "alpha ", bold: true },
        { text: "bravo ", bold: true, italic: true },
        { text: "charlie", italic: true },
      ],
    })
    const markdown = "[**alpha _bravo_** _charlie_](https://www.google.com/)"
    const text = "alpha bravo charlie"
    roundtrip(blocks, { markdown, text })
  })

  it("should handle a fully bolded link", async () => {
    const blocks = p({
      type: "link",
      url: "https://www.google.com/",
      children: [
        { text: "alpha ", bold: true },
        { text: "bravo ", bold: true, italic: true },
        { text: "charlie", bold: true },
      ],
    })
    const markdown = "**[alpha _bravo_ charlie](https://www.google.com/)**"
    const text = "alpha bravo charlie"
    roundtrip(blocks, { markdown, text })
  })

  it("should handle two adjacent links with an empty space in between", async () => {
    const blocks = p(
      {
        type: "link",
        url: "https://www.google.com/",
        children: [{ text: "alpha" }],
      },
      { text: "" },
      {
        type: "link",
        url: "https://www.google.com/",
        children: [{ text: "alpha" }],
      }
    )
    const markdown =
      "[alpha](https://www.google.com/)[alpha](https://www.google.com/)"
    const text = "alphaalpha"
    roundtrip(blocks, { markdown, text })
  })
})

describe("spaces", () => {
  it("should remove trailing spaces", async () => {
    const blocks = p({
      text: "Hello World  ",
    })
    const markdown = "Hello World"
    const text = "Hello World"
    roundtrip(blocks, { markdown, text })
  })

  it("should remove preceding spaces", async () => {
    const blocks = p({
      text: "  Hello World",
    })
    const markdown = "Hello World"
    const text = "Hello World"
    roundtrip(blocks, { markdown, text })
  })
})

describe("line breaks", () => {
  it("should handle a line break", () => {
    const blocks = p({
      text: `hello\nworld`,
    })
    const markdown = "hello<br>world"
    const text = "hello\nworld"
    roundtrip(blocks, { markdown, text })
  })

  it("should handle mdast break with two spaces at the end", () => {
    const markdown = `hello  \nworld`
    testParse(markdown, [{ type: "p", children: [{ text: "hello\nworld" }] }])
  })
})
