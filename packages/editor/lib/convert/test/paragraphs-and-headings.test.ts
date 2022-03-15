import { RootBlockElement } from "~/editor/types"
import { roundtrip } from "./convert-test-utils"

describe("paragraph and headings", () => {
  it("should handle a paragraph", async () => {
    const blocks: RootBlockElement[] = [
      { type: "p", children: [{ text: "hello" }] },
    ]
    const markdown = "hello"
    const text = "hello"
    roundtrip(blocks, { markdown, text })
  })

  it("should handle empty headings", async () => {
    const blocks: RootBlockElement[] = [
      { type: "heading", level: 1, children: [{ text: "" }] },
    ]
    const markdown = `#`
    const text = ``
    roundtrip(blocks, { markdown, text })
  })

  it("should parse headings", () => {
    const blocks: RootBlockElement[] = [
      { type: "heading", level: 1, children: [{ text: "h1" }] },
      { type: "heading", level: 2, children: [{ text: "h2" }] },
      { type: "heading", level: 3, children: [{ text: "h3" }] },
      { type: "heading", level: 4, children: [{ text: "h4" }] },
      { type: "heading", level: 5, children: [{ text: "h5" }] },
      { type: "heading", level: 6, children: [{ text: "h6" }] },
      { type: "p", children: [{ text: "####### h7" }] },
      { type: "p", children: [{ text: "#invalid" }] },
    ]
    const markdown = `# h1

## h2

### h3

#### h4

##### h5

###### h6

\\#\\#\\#\\#\\#\\#\\# h7

\\#invalid`
    const text = `h1

h2

h3

h4

h5

h6

####### h7

#invalid`
    roundtrip(blocks, { markdown, text })
  })

  it("should handle # at the begining of aline without turning it into a heading", async () => {
    const blocks: RootBlockElement[] = [
      { type: "p", children: [{ text: "# hello" }] },
    ]
    const markdown = "\\# hello"
    const text = "# hello"
    roundtrip(blocks, { markdown, text })
  })

  it("should handle an empty paragraph", async () => {
    const blocks: RootBlockElement[] = [{ type: "p", children: [{ text: "" }] }]
    const markdown = ""
    const text = ""
    roundtrip(blocks, { markdown, text })
  })

  it("should handle empty headings", async () => {
    const blocks: RootBlockElement[] = [
      { type: "heading", level: 1, children: [{ text: "" }] },
    ]
    const markdown = "#"
    const text = ""
    roundtrip(blocks, { markdown, text })
  })
})
