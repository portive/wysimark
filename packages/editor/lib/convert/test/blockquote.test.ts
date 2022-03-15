import { RootBlockElement } from "~/editor/types"
import { roundtrip } from "./convert-test-utils"

describe("blockquote", () => {
  it("should parse simple blockquote with two paragraphs", () => {
    const blocks: RootBlockElement[] = [
      {
        type: "blockquote",
        children: [
          { type: "p", children: [{ text: "alpha" }] },
          { type: "p", children: [{ text: "bravo" }] },
        ],
      },
    ]
    const markdown = "> alpha\n> \n> bravo"
    const text = "alpha\n\nbravo"
    roundtrip(blocks, { markdown, text })
  })

  it("should parse two blockquotes with two paragraph each", async () => {
    const blocks: RootBlockElement[] = [
      {
        type: "blockquote",
        children: [
          { type: "p", children: [{ text: "alpha" }] },
          { type: "p", children: [{ text: "bravo" }] },
        ],
      },
      {
        type: "blockquote",
        children: [
          { type: "p", children: [{ text: "charlie" }] },
          { type: "p", children: [{ text: "delta" }] },
        ],
      },
    ]
    const markdown = "> alpha\n> \n> bravo\n\n> charlie\n> \n> delta"
    const text = "alpha\n\nbravo\n\ncharlie\n\ndelta"
    roundtrip(blocks, { markdown, text })
  })

  it("should parse a nested block quote", async () => {
    const blocks: RootBlockElement[] = [
      {
        type: "blockquote",
        children: [
          {
            type: "blockquote",
            children: [
              { type: "p", children: [{ text: "alpha" }] },
              { type: "p", children: [{ text: "bravo" }] },
            ],
          },
        ],
      },
    ]
    const markdown = "> > alpha\n> > \n> > bravo"
    const text = "alpha\n\nbravo"
    roundtrip(blocks, { markdown, text })
  })

  it("should parse an unusually nested block quote", async () => {
    const blocks: RootBlockElement[] = [
      {
        type: "blockquote",
        children: [
          {
            type: "blockquote",
            children: [
              { type: "p", children: [{ text: "alpha" }] },
              { type: "p", children: [{ text: "bravo" }] },
            ],
          },
        ],
      },
      { type: "p", children: [{ text: "charlie" }] },
      { type: "p", children: [{ text: "delta" }] },
    ]
    const markdown = "> > alpha\n> > \n> > bravo\n\ncharlie\n\ndelta"
    const text = "alpha\n\nbravo\n\ncharlie\n\ndelta"
    roundtrip(blocks, { markdown, text })
  })
})
