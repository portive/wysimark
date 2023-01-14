import { log } from "../../../test/test-utils"
import { serializeLine } from "../serialize-line"

describe("serializeLine", () => {
  it("should serialize a plain text line", async () => {
    const s = serializeLine([{ text: "alpha" }])
    expect(s).toEqual("alpha")
  })

  it("should serialize a single bold word", async () => {
    const s = serializeLine([{ text: "alpha", bold: true }])
    log(s)
  })
})
