import beautify from "json-beautify"

import { normalizeLine } from "../../normalize-line"

export function log(value: unknown) {
  /**
   * This looks like a mistaken type on `beautify` because using `null`
   * is explicitly described in the `beautify` documentaiton.
   *
   * https://www.npmjs.com/package/json-beautify
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.log(beautify(value, null as any, 2, 60))
}

describe("normalize line segment spaces around anchors", () => {
  it("should leave anchor text alone when there are no spaces at edge of anchor", async () => {
    const nodes = normalizeLine([
      { text: "alpha" },
      { type: "anchor", href: "", children: [{ text: "bravo" }] },
      { text: "charlie" },
    ])
    expect(nodes).toEqual([
      { text: "alpha" },
      {
        type: "anchor",
        href: "",
        children: [{ text: "bravo" }],
      },
      { text: "charlie" },
    ])
  })

  it("should leave spaces alone just outside of anchor", async () => {
    const nodes = normalizeLine([
      { text: "alpha " },
      { type: "anchor", href: "", children: [{ text: "bravo" }] },
      { text: " charlie" },
    ])
    expect(nodes).toEqual([
      { text: "alpha" },
      { text: " " },
      {
        type: "anchor",
        href: "",
        children: [{ text: "bravo" }],
      },
      { text: " " },
      { text: "charlie" },
    ])
  })

  it("should lift spaces at start of anchor", async () => {
    const nodes = normalizeLine([
      { text: "alpha" },
      { type: "anchor", href: "", children: [{ text: " bravo" }] },
    ])
    expect(nodes).toEqual([
      { text: "alpha" },
      { text: " " },
      {
        type: "anchor",
        href: "",
        children: [{ text: "bravo" }],
      },
    ])
  })

  it("should lift spaces at start of anchor up and merge", async () => {
    const nodes = normalizeLine([
      { text: "alpha " },
      { type: "anchor", href: "", children: [{ text: " bravo" }] },
    ])
    expect(nodes).toEqual([
      { text: "alpha" },
      { text: "  " },
      {
        type: "anchor",
        href: "",
        children: [{ text: "bravo" }],
      },
    ])
  })

  it("should lift spaces at start of anchor up and insert if no prev node but it will get deleted", async () => {
    const nodes = normalizeLine([
      { type: "anchor", href: "", children: [{ text: " alpha" }] },
    ])
    expect(nodes).toEqual([
      {
        type: "anchor",
        href: "",
        children: [{ text: "alpha" }],
      },
    ])
  })

  it("should lift spaces at end of anchor", async () => {
    const nodes = normalizeLine([
      { type: "anchor", href: "", children: [{ text: "alpha " }] },
      { text: "bravo" },
    ])
    expect(nodes).toEqual([
      {
        type: "anchor",
        href: "",
        children: [{ text: "alpha" }],
      },
      { text: " " },
      { text: "bravo" },
    ])
  })

  it("should lift spaces at end of anchor up and merge", async () => {
    const nodes = normalizeLine([
      { type: "anchor", href: "", children: [{ text: "alpha " }] },
      { text: " bravo" },
    ])
    expect(nodes).toEqual([
      {
        type: "anchor",
        href: "",
        children: [{ text: "alpha" }],
      },
      { text: "  " },
      { text: "bravo" },
    ])
  })

  it("should lift spaces at end of anchor up and insert if no next node but it will get deleted", async () => {
    const nodes = normalizeLine([
      { type: "anchor", href: "", children: [{ text: "alpha " }] },
    ])
    expect(nodes).toEqual([
      {
        type: "anchor",
        href: "",
        children: [{ text: "alpha" }],
      },
    ])
  })

  it("should normalize space at start and end of anchor", async () => {
    const nodes = normalizeLine([
      { text: "alpha" },
      { type: "anchor", href: "", children: [{ text: " bravo " }] },
      { text: "charlie" },
    ])
    expect(nodes).toEqual([
      { text: "alpha" },
      { text: " " },
      {
        type: "anchor",
        href: "",
        children: [{ text: "bravo" }],
      },
      { text: " " },
      { text: "charlie" },
    ])
  })
})
