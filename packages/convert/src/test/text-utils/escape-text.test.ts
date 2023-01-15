import { escapeText } from "../../serialize/serialize-line/utils"

describe("escape text", () => {
  it("should not escape text without punctuation", async () => {
    const s = escapeText("alpha bravo")
    expect(s).toEqual("alpha bravo")
  })
})
