import { Text } from "../../../types"
import { normalizeSegments } from ".."

describe("normalize marks", () => {
  it("should leave plain text alone", async () => {
    const segments: Text[] = [{ text: "alpha bravo charlie" }]
    const nextSegments = normalizeSegments(segments)
    expect(nextSegments).toEqual(segments)
  })

  it("should leave split without spaces alone", async () => {
    const segments: Text[] = [
      { text: "alpha b" },
      { text: "rav", bold: true },
      { text: "o charlie" },
    ]
    const nextSegments = normalizeSegments(segments)
    expect(nextSegments).toEqual(segments)
  })

  // it("should leave a lone bold with proper boundaries alone", async () => {
  //   const segments: Text[] = [
  //     { text: "alpha " },
  //     { text: "bravo", bold: true },
  //     { text: " charlie" },
  //   ]
  //   const nextSegments = normalizeSegments(segments)
  //   expect(nextSegments).toEqual(segments)
  // })

  it.only("should fix a boundary by shifting the split to the right", async () => {
    const segments: Text[] = [{ text: "alpha" }, { text: " bravo", bold: true }]
    const nextSegments = normalizeSegments(segments)
    // console.log(nextSegments)
    // expect(nextSegments).toEqual([
    //   { text: "alpha " },
    //   { text: "bravo", bold: true },
    // ])
  })

  // it("should fix a boundary by shifting the split to the left", async () => {
  // })
})
