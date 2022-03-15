/** @jsx jsx  */
import { td } from "~/lib/convert/test/util"
import { jsx, normalize } from "../../test-utils"

describe("normalize-table", () => {
  describe("don't normalize", () => {
    it("should keep a normalized table normal", async () => {
      const input = (
        <editor>
          <table columns={[{ align: "left" }, { align: "center" }]}>
            <tr>
              {td(0, "a")}
              {td(1, "b")}
            </tr>
            <tr>
              {td(0, "c")}
              {td(1, "d")}
            </tr>
          </table>
          <p>
            <text />
          </p>
        </editor>
      )
      const output = (
        <editor>
          <table columns={[{ align: "left" }, { align: "center" }]}>
            <tr>
              {td(0, "a")}
              {td(1, "b")}
            </tr>
            <tr>
              {td(0, "c")}
              {td(1, "d")}
            </tr>
          </table>
          <p>
            <text />
          </p>
        </editor>
      )
      normalize(input, output)
    })
  })

  describe("normalize parent", () => {
    it("doesn't need to normalize parent", async () => {
      /* added for clarity */
    })
  })

  describe("normalize empty children", () => {
    it("should remove a table with no rows", async () => {
      const input = (
        <editor>
          <table columns={[{ align: "left" }]}></table>
          <p>
            <text />
          </p>
        </editor>
      )
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
    it("should remove invalid children", async () => {
      const input = (
        <editor>
          <table columns={[{ align: "left" }, { align: "center" }]}>
            <tr>
              {td(0, "a")}
              {td(1, "b")}
            </tr>
            <p>
              <text />
            </p>
            <tr>
              {td(0, "c")}
              {td(1, "d")}
            </tr>
          </table>
          <p>
            <text />
          </p>
        </editor>
      )
      const output = (
        <editor>
          <table columns={[{ align: "left" }, { align: "center" }]}>
            <tr>
              {td(0, "a")}
              {td(1, "b")}
            </tr>
            <tr>
              {td(0, "c")}
              {td(1, "d")}
            </tr>
          </table>
          <p>
            <text />
          </p>
        </editor>
      )
      normalize(input, output)
    })
  })

  describe("normalize shape", () => {
    it("doesn't need to normalize its shape", async () => {
      /**
       * This is handled in `tr` and `td` normalizer
       */
    })
  })
})
