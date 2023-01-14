import { log } from "../../../test/test-utils"
import { serializeLine } from "../serialize-line"

describe("serializeLine", () => {
  describe("single word", () => {
    it("should serialize a plain text line", async () => {
      const s = serializeLine([{ text: "alpha" }])
      expect(s).toEqual("alpha")
    })

    it("should serialize a single bold word", async () => {
      const s = serializeLine([{ text: "alpha", bold: true }])
      expect(s).toEqual("**alpha**")
    })

    it("should serialize a split word", async () => {
      const s = serializeLine([{ text: "space" }, { text: "man", bold: true }])
      expect(s).toEqual("space**man**")
    })

    it("should serialize a split word", async () => {
      const s = serializeLine([{ text: "space", bold: true }, { text: "man" }])
      expect(s).toEqual("**space**man")
    })
  })

  describe("ignore space affinity", () => {
    it("should serialize a single word followed by a bold word with a space", async () => {
      const s = serializeLine([
        { text: "alpha " },
        { text: "bravo", bold: true },
      ])
      expect(s).toEqual("alpha **bravo**")
    })

    it("should serialize a single word followed by a bold word with a space on the other side", async () => {
      const s = serializeLine([
        { text: "alpha" },
        { text: " bravo", bold: true },
      ])
      expect(s).toEqual("alpha **bravo**")
    })

    it("should serialize a single word followed by a bold word with a space on both sides", async () => {
      const s = serializeLine([
        { text: "alpha " },
        { text: " bravo", bold: true },
      ])
      expect(s).toEqual("alpha  **bravo**")
    })
  })

  describe("nested", () => {
    it("should handle a simple nested", async () => {
      const s = serializeLine([
        { text: "alpha", bold: true, italic: true },
        { text: " bravo", bold: true },
      ])
      expect(s).toEqual("**_alpha_ bravo**")
    })

    it("should handle a nested that requires unwrapping", async () => {
      const s = serializeLine([
        { text: "alpha", bold: true, italic: true },
        { text: " bravo", italic: true },
      ])
      expect(s).toEqual("**_alpha_** _bravo_")
    })
  })

  describe("code needs to always be at the lowest level", () => {
    it("should ensure code is at the lowest level", async () => {
      const s = serializeLine([
        { text: "alpha", code: true, bold: true, italic: true },
        { text: " bravo", code: true, italic: true },
      ])
      expect(s).toEqual("**_`alpha`_**_` bravo`_")
    })

    it.skip("should ensure code is at the lowest level even inside links", async () => {
      // noop
    })
  })
})
