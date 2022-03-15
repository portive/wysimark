import { RootBlockElement } from "~/editor/types"
import { roundtrip } from "./convert-test-utils"

describe("trailing", () => {
  it("should remove trailing paragraphs", async () => {
    const blocks: RootBlockElement[] = [
      { type: "p", children: [{ text: "hello" }] },
      { type: "p", children: [{ text: "" }] },
    ]
    const markdown = "hello"
    const text = "hello"
    roundtrip(blocks, { markdown, text })
  })
})
