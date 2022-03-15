import { p, roundtrip } from "./convert-test-utils"

describe("line", () => {
  /**
   * Make sure that children always has at least one node in it
   */
  it("should handle sub and super", async () => {
    const blocks = p(
      { text: "I am " },
      { text: "sub ", sub: true },
      { text: "and", bold: true },
      { text: " " },
      { text: "super ", sup: true }
    )
    const markdown = "I am ~sub~ **and** ^super^"
    const text = "I am sub and super"
    roundtrip(blocks, { markdown, text })
  })
})
