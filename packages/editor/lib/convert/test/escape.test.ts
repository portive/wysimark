import { RootBlockElement } from "~/editor/types"
import { roundtrip } from "./convert-test-utils"

describe("escape edge cases", () => {
  it("should escape text in blocks", () => {
    const blocks: RootBlockElement[] = [
      {
        type: "p",
        children: [
          { text: "bold", bold: true },
          { text: " not **bold** _italic_" },
        ],
      },
    ]

    const markdown = `**bold** not \\*\\*bold\\*\\* \\_italic\\_`
    const text = "bold not **bold** _italic_"
    roundtrip(blocks, { markdown, text })
  })

  it("should allow escaped characters in a link", () => {
    const blocks: RootBlockElement[] = [
      {
        type: "p",
        children: [
          {
            type: "link",
            url: "http://google.com/",
            children: [{ text: "*Google" }],
          },
        ],
      },
    ]
    const markdown = `[\\*Google](http://google.com/)`
    const text = "*Google"
    roundtrip(blocks, { markdown, text })
  })

  it("should escape leading #", () => {
    const blocks: RootBlockElement[] = [
      { type: "p", children: [{ text: "# not a heading" }] },
    ]
    const markdown = `\\# not a heading`
    const text = "# not a heading"
    roundtrip(blocks, { markdown, text })
  })
})
