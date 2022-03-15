import { RootBlockElement } from "~/editor/types"
import { testParse } from "./convert-test-utils"

describe("definitions", () => {
  it("should unlink a numbered reference link", () => {
    const markdown = `A [link][2]
[2]: https://example.org "Title"`
    const blocks: RootBlockElement[] = [
      {
        type: "p",
        children: [
          { text: "A " },
          {
            type: "link",
            url: "https://example.org",
            children: [{ text: "link" }],
          },
        ],
      },
    ]
    testParse(markdown, blocks)
  })

  it("should unlink a textual reference link", () => {
    const markdown = `A [link][example-link]
  [example-link]: https://example.org "Title"`
    const blocks: RootBlockElement[] = [
      {
        type: "p",
        children: [
          { text: "A " },
          {
            type: "link",
            url: "https://example.org",
            children: [{ text: "link" }],
          },
        ],
      },
    ]
    testParse(markdown, blocks)
  })

  it("should unlink the remark-inline-links links example", async () => {
    const markdown = `[foo], [foo][], [bar][foo].

  [foo]: http://example.com "Example Domain"`
    const blocks: RootBlockElement[] = [
      {
        type: "p",
        children: [
          {
            type: "link",
            url: "http://example.com",
            children: [{ text: "foo" }],
          },
          { text: ", " },
          {
            type: "link",
            url: "http://example.com",
            children: [{ text: "foo" }],
          },
          { text: ", " },
          {
            type: "link",
            url: "http://example.com",
            children: [{ text: "bar" }],
          },
          { text: "." },
        ],
      },
    ]
    testParse(markdown, blocks)
  })

  it("should unlink the remark-inline-links images example", async () => {
    const markdown = `![foo], ![foo][], ![bar][foo].

  [foo]: http://example.com "Example Domain"`
    const blocks: RootBlockElement[] = [
      {
        type: "media",
        alt: "foo",
        url: "http://example.com",
        children: [{ text: "" }],
      },
      {
        type: "p",
        children: [{ text: ", " }],
      },
      {
        type: "media",
        alt: "foo",
        url: "http://example.com",
        children: [{ text: "" }],
      },
      {
        type: "p",
        children: [{ text: ", " }],
      },
      {
        type: "media",
        alt: "bar",
        url: "http://example.com",
        children: [{ text: "" }],
      },
      {
        type: "p",
        children: [{ text: "." }],
      },
    ]
    testParse(markdown, blocks)
  })

  it("should gracefully fail if there is no reference in link", async () => {
    const markdown = `**[link][example-link]**`
    const blocks: RootBlockElement[] = [
      {
        type: "p",
        children: [{ text: "link", bold: true }],
      },
    ]
    testParse(markdown, blocks)
  })

  it("should gracefully fail if there is no reference in image", async () => {
    const markdown = `**![link][example-link]**`
    const blocks: RootBlockElement[] = [
      {
        type: "p",
        children: [{ text: "link", bold: true }],
      },
    ]
    testParse(markdown, blocks)
  })

  it("should gracefully remove definitions", () => {
    const markdown = `[Alpha]: example.com`
    const blocks: RootBlockElement[] = [{ type: "p", children: [{ text: "" }] }]
    testParse(markdown, blocks)
  })

  it("should gracefully remove footnote definitions", () => {
    const markdown = `[^alpha]: example.com`
    const blocks: RootBlockElement[] = [{ type: "p", children: [{ text: "" }] }]
    testParse(markdown, blocks)
  })
})
