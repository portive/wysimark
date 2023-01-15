import { log } from "../../../test/test-utils"
import { serializeLine } from "../serialize-line"

describe("serialize anchor", () => {
  describe("anchor by itself", () => {
    it("should serialize anchor with plain text child", async () => {
      const s = serializeLine([
        {
          type: "anchor",
          href: "http://domain.com",
          children: [{ text: "alpha" }],
        },
      ])
      expect(s).toEqual("[alpha](http://domain.com)")
    })

    it("should serialize anchor with bold child", async () => {
      const s = serializeLine([
        {
          type: "anchor",
          href: "http://domain.com",
          children: [{ text: "alpha", bold: true }],
        },
      ])
      expect(s).toEqual("**[alpha](http://domain.com)**")
    })

    it("should serialize anchor with complex child", async () => {
      const s = serializeLine([
        {
          type: "anchor",
          href: "http://domain.com",
          children: [
            { text: "alpha ", bold: true, italic: true },
            { text: "bravo", italic: true },
          ],
        },
      ])
      expect(s).toEqual("_[**alpha** bravo](http://domain.com)_")
    })
  })

  describe("anchor with plain siblings", () => {
    it("should with plain siblings serialize anchor with plain text child", async () => {
      const s = serializeLine([
        { text: "alpha " },
        {
          type: "anchor",
          href: "http://bravo.com",
          children: [{ text: "bravo" }],
        },
        { text: " charlie" },
      ])
      expect(s).toEqual("alpha [bravo](http://bravo.com) charlie")
    })

    it("should with plain siblings serialize anchor with bold child", async () => {
      const s = serializeLine([
        { text: "alpha " },
        {
          type: "anchor",
          href: "http://bravo.com",
          children: [{ text: "bravo", bold: true }],
        },
        { text: " charlie" },
      ])
      expect(s).toEqual("alpha **[bravo](http://bravo.com)** charlie")
    })

    it("should with plain siblings serialize anchor with complex child", async () => {
      const s = serializeLine([
        { text: "alpha " },
        {
          type: "anchor",
          href: "http://bravo.com",
          children: [
            { text: "bravo ", bold: true, italic: true },
            { text: "charlie", italic: true },
          ],
        },
        { text: " delta" },
      ])
      expect(s).toEqual("alpha _[**bravo** charlie](http://bravo.com)_ delta")
    })
  })

  describe("anchor with bold siblings and one child", () => {
    it("should with bold siblings serialize anchor with plain text child", async () => {
      const s = serializeLine([
        { text: "alpha ", bold: true },
        {
          type: "anchor",
          href: "http://bravo.com",
          children: [{ text: "bravo" }],
        },
        { text: " charlie", bold: true },
      ])
      expect(s).toEqual("**alpha** [bravo](http://bravo.com) **charlie**")
    })

    it("should with bold siblings serialize anchor with a bold text child", async () => {
      const s = serializeLine([
        { text: "alpha ", bold: true },
        {
          type: "anchor",
          href: "http://bravo.com",
          children: [{ text: "bravo", bold: true }],
        },
        { text: " charlie", bold: true },
      ])
      expect(s).toEqual("**alpha [bravo](http://bravo.com) charlie**")
    })

    it("should with bold siblings serialize anchor with a bold and italic text child", async () => {
      const s = serializeLine([
        { text: "alpha ", bold: true },
        {
          type: "anchor",
          href: "http://bravo.com",
          children: [{ text: "bravo", bold: true, italic: true }],
        },
        { text: " charlie", bold: true },
      ])
      expect(s).toEqual("**alpha _[bravo](http://bravo.com)_ charlie**")
    })
  })

  describe("anchor with siblings and two children", () => {
    const s = serializeLine([
      { text: "alpha ", bold: true },
      {
        type: "anchor",
        href: "http://bravo.com",
        children: [
          { text: "bravo ", bold: true, italic: true },
          { text: "charlie", bold: true },
        ],
      },
      { text: " charlie", bold: true },
    ])
    expect(s).toEqual("**alpha [_bravo_ charlie](http://bravo.com) charlie**")
  })
})
