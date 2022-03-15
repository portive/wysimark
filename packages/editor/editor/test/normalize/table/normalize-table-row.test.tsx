/** @jsx jsx  */
import { td } from "~/lib/convert/test/util"
import { jsx, normalize } from "../../test-utils"

describe("normalize table row", () => {
  describe("don't normalize", () => {
    it("doesn't normalize in table test", async () => {
      /**
       * The don't normalize state is checked already in `normalize-table`
       */
    })
  })
  describe("normalize parent", () => {
    it("should normalize en empty tr without children", async () => {
      const input = (
        <editor>
          <tr>
            <text />
          </tr>
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

    it("should normalize a tr with some children", async () => {
      const input = (
        <editor>
          <tr>
            <td index={0}>
              <heading level={1}>
                <text>abc</text>
              </heading>
              <p>
                <text>def</text>
              </p>
            </td>
          </tr>
        </editor>
      )
      const output = (
        <editor>
          <p>
            <text>abcdef</text>
          </p>
        </editor>
      )
      normalize(input, output)
    })
  })

  describe("normalize empty children", () => {
    it("should remove an empty row", async () => {
      const input = (
        <editor>
          <table columns={[{ align: "left" }]}>
            <tr></tr>
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
            </tr>
          </table>
          <p>
            <text />
          </p>
        </editor>
      )
      const output = (
        <editor>
          <table columns={[{ align: "left" }]}>
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
            </tr>
          </table>
          <p>
            <text />
          </p>
        </editor>
      )
      normalize(input, output)
    })

    it("should remove an empty row leading to an empty table", async () => {
      const input = (
        <editor>
          <table columns={[{ align: "left" }]}>
            <tr></tr>
          </table>
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
          <table columns={[{ align: "left" }]}>
            <tr>
              <td index={0}>
                <p>
                  <text>abc</text>
                </p>
              </td>
              <p>
                <text>def</text>
              </p>
            </tr>
          </table>
          <p>
            <text />
          </p>
        </editor>
      )
      const output = (
        <editor>
          <table columns={[{ align: "left" }]}>
            <tr>
              <td index={0}>
                <p>
                  <text>abc</text>
                </p>
              </td>
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
    it("should add cells to match columns", async () => {
      const input = (
        <editor>
          <table columns={[{ align: "left" }, { align: "center" }]}>
            <tr>
              <td index={0}>
                <p>
                  <text>abc</text>
                </p>
              </td>
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
              <td index={0}>
                <p>
                  <text>abc</text>
                </p>
              </td>
              <td index={1}>
                <p>
                  <text />
                </p>
              </td>
            </tr>
          </table>
          <p>
            <text />
          </p>
        </editor>
      )
      normalize(input, output)
    })

    it("should remove cells to match columns", async () => {
      const input = (
        <editor>
          <table columns={[{ align: "left" }, { align: "center" }]}>
            <tr>
              {td(0, "a")}
              {td(1, "b")}
              {td(2, "c")}
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
          </table>
          <p>
            <text />
          </p>
        </editor>
      )
      normalize(input, output)
    })
  })
})
