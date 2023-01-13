import { normalizeSegments } from ".."

describe("normalize trim line", () => {
  it("should trim a leading space", async () => {
    const segments = normalizeSegments([{ text: " " }, { text: "alpha" }])
    expect(segments).toEqual([{ text: "alpha" }])
  })

  it("should trim a trailing space", async () => {
    const segments = normalizeSegments([{ text: "alpha" }, { text: " " }])
    expect(segments).toEqual([{ text: "alpha" }])
  })

  it("should trim an only space", async () => {
    const segments = normalizeSegments([{ text: " " }])
    expect(segments).toEqual([{ text: "" }])
  })
})
