import { RootBlockElement } from "~/editor/types"
import { roundtrip, testParse } from "./convert-test-utils"

describe("newline", () => {
  it("should convert newline to <br> in paragraphs", async () => {
    const blocks: RootBlockElement[] = [
      { type: "p", children: [{ text: "hello\nworld" }] },
    ]

    const markdown = "hello<br>world"
    const text = "hello\nworld"
    roundtrip(blocks, { markdown, text })
  })

  it("should handle <br/>", async () => {
    const markdown = "hello<br/>world"
    const blocks: RootBlockElement[] = [
      { type: "p", children: [{ text: "hello\nworld" }] },
    ]
    testParse(markdown, blocks)
  })

  it("should handle <br   />", async () => {
    const markdown = "hello<br/>world"
    const blocks: RootBlockElement[] = [
      { type: "p", children: [{ text: "hello\nworld" }] },
    ]
    testParse(markdown, blocks)
  })

  it("should work with html before it", async () => {
    const markdown = "hello<p><br>world"
    const blocks: RootBlockElement[] = [
      {
        type: "p",
        children: [
          { text: "hello" },
          { text: "<p>", code: true },
          { text: "\nworld" },
        ],
      },
    ]
    testParse(markdown, blocks)
  })
})
