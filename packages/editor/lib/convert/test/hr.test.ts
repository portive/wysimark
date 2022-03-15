import { RootBlockElement } from "~/editor/types"
import { roundtrip } from "./convert-test-utils"

describe("hr", () => {
  it("should parse hr", () => {
    const blocks: RootBlockElement[] = [
      { type: "hr", children: [{ text: "" }] },
    ]
    const markdown = "---"
    const text = ""
    roundtrip(blocks, { markdown, text })
  })
})
