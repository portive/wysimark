import { AnchorElement } from "~/src/anchor-plugin"

import { normalizeSegments } from "../../parse/parse-phrasing-content/normalize-segments"

const anchor: AnchorElement = {
  type: "anchor",
  href: "http://localhost",
  children: [{ text: "anchor" }],
}

describe("normalize segments", () => {
  describe("no empty children", () => {
    it("should always have at least one segment.", async () => {
      const segments = normalizeSegments([])
      expect(segments).toEqual([{ text: "" }])
    })
  })

  describe("merge similar text segments together", () => {
    it("should merge two similar text segments", async () => {
      const segments = normalizeSegments([{ text: "alpha" }, { text: "bravo" }])
      expect(segments).toEqual([{ text: "alphabravo" }])
    })

    it("should merge similar text segments separate by an inline", async () => {
      const segments = normalizeSegments([
        { text: "alpha" },
        { text: "bravo" },
        anchor,
        { text: "charlie" },
        { text: "delta" },
      ])
      expect(segments).toEqual([
        { text: "alphabravo" },
        anchor,
        { text: "charliedelta" },
      ])
    })
  })

  describe("do not merge dissimilar text", () => {
    it("should not merge dissimilar text segments", async () => {
      const segments = normalizeSegments([
        { text: "alpha" },
        { text: "bravo", bold: true },
        { text: "charlie", bold: true },
      ])
      expect(segments).toEqual([
        { text: "alpha" },
        { text: "bravocharlie", bold: true },
      ])
    })
  })

  describe("add spaces at start, end and between elements", () => {
    it("should ensure a leading Text segment", async () => {
      const segments = normalizeSegments([anchor, { text: "alpha" }])
      expect(segments).toEqual([{ text: "" }, anchor, { text: "alpha" }])
    })

    it("should ensure a trailing Text segment", async () => {
      const segments = normalizeSegments([{ text: "alpha" }, anchor])
      expect(segments).toEqual([{ text: "alpha" }, anchor, { text: "" }])
    })

    it("should should have Text between inline elements", async () => {
      const segments = normalizeSegments([
        { text: "alpha" },
        anchor,
        anchor,
        { text: "bravo" },
      ])
      expect(segments).toEqual([
        { text: "alpha" },
        anchor,
        { text: "" },
        anchor,
        { text: "bravo" },
      ])
    })

    it("should ensure all necessary blank Text are added", async () => {
      const segments = normalizeSegments([anchor, anchor])
      expect(segments).toEqual([
        { text: "" },
        anchor,
        { text: "" },
        anchor,
        { text: "" },
      ])
    })
  })
})
