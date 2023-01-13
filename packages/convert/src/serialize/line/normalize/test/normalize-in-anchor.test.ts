import beautify from "json-beautify"

import { normalizeLine } from ".."

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
  it("should leave anchor alone when boundaries touch words", async () => {
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

  it("should normalize space at start and end of anchor", async () => {
    const nodes = normalizeLine([
      { text: "alpha" },
      { type: "anchor", href: "", children: [{ text: " bravo " }] },
      { text: "charlie" },
    ])
    expect(nodes).toEqual([
      { text: "alpha" },
      {
        type: "anchor",
        href: "",
        children: [{ text: " " }, { text: "bravo" }, { text: " " }],
      },
      { text: "charlie" },
    ])
  })

  it("should keep spaces just outside of anchor", async () => {
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

  it("should not merge spaces around anchors at this point in time", async () => {
    const nodes = normalizeLine([
      { text: "alpha " },
      { type: "anchor", href: "", children: [{ text: " bravo " }] },
      { text: " charlie" },
    ])
    expect(nodes).toEqual([
      { text: "alpha" },
      { text: " " },
      {
        type: "anchor",
        href: "",
        children: [{ text: " " }, { text: "bravo" }, { text: " " }],
      },
      { text: " " },
      { text: "charlie" },
    ])
  })
})
