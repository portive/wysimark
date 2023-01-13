import { normalizeLineTrim } from "../normalize-line-trim"

describe("normalize trim line", () => {
  it("should trim a leading space", async () => {
    const segments = normalizeLineTrim([{ text: " " }, { text: "alpha" }])
    expect(segments).toEqual([{ text: "alpha" }])
  })

  it("should trim a trailing space", async () => {
    const segments = normalizeLineTrim([{ text: "alpha" }, { text: " " }])
    expect(segments).toEqual([{ text: "alpha" }])
  })

  it("should trim an only space", async () => {
    const segments = normalizeLineTrim([{ text: " " }])
    expect(segments).toEqual([{ text: "" }])
  })
})
