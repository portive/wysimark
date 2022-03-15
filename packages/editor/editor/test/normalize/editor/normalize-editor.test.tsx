/** @jsx jsx  */
import { jsx, normalize } from "../../test-utils"

describe("last block must be convertible", () => {
  describe("normalize parent", () => {
    it("n/a", async () => {
      /* added for clarity */
    })
  })

  describe("normalize empty", () => {
    it("should add a paragraph in an empty editor", async () => {
      const input = <editor></editor>
      const output = (
        <editor>
          <p>
            <text />
          </p>
        </editor>
      )
      normalize(input, output)
    })
  })

  describe("normalize invalid children", () => {
    it("should add a trailing paragraph if the last block isn't a convertible", async () => {
      const input = (
        <editor>
          <hr>
            <text />
          </hr>
        </editor>
      )
      const output = (
        <editor>
          <hr>
            <text />
          </hr>
          <p>
            <text />
          </p>
        </editor>
      )
      normalize(input, output)
    })

    it("should not add a paragraph if it's a convertible type like a heading", async () => {
      const input = (
        <editor>
          <heading level={2}>
            <text />
          </heading>
        </editor>
      )
      const output = (
        <editor>
          <heading level={2}>
            <text />
          </heading>
        </editor>
      )
      normalize(input, output)
    })
  })

  describe("normalize props", () => {
    it("n/a", async () => {
      /* added for clarity */
    })
  })
})
