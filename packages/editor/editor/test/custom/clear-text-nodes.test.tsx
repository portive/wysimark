/** @jsx jsx  */
import { clearSelection } from "~/editor/custom/clear-range"
import { compareWithoutNormalize as compare, jsx } from "../test-utils"

describe("clearTextNodes", () => {
  describe("clearTextNodesInRange", () => {
    it("should clear part of the text nodes in a table", async () => {
      const input = (
        <editor>
          <table columns={[{ align: "left" }, { align: "left" }]}>
            <tr>
              <td index={0}>
                <text>a1</text>
              </td>
              <td index={1}>
                <text>
                  abc
                  <anchor />
                  def
                  <focus />
                  ghi
                </text>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <text>b1</text>
              </td>
              <td index={1}>
                <text>b2</text>
              </td>
            </tr>
          </table>
        </editor>
      )

      const output = (
        <editor>
          <table columns={[{ align: "left" }, { align: "left" }]}>
            <tr>
              <td index={0}>
                <text>a1</text>
              </td>
              <td index={1}>
                <text>
                  abc
                  <cursor />
                  ghi
                </text>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <text>b1</text>
              </td>
              <td index={1}>
                <text>b2</text>
              </td>
            </tr>
          </table>
        </editor>
      )

      compare(input, output, (editor) => {
        clearSelection(editor)
      })
    })

    it("should clear part of the text nodes in a table", async () => {
      const input = (
        <editor>
          <table columns={[{ align: "left" }, { align: "left" }]}>
            <tr>
              <td index={0}>
                <text>a</text>
              </td>
              <td index={1}>
                <text>b</text>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <text>
                  a<anchor />1
                </text>
              </td>
              <td index={1}>
                <text>a2</text>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <text>b1</text>
              </td>
              <td index={1}>
                <text>
                  b<focus />2
                </text>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <text>a</text>
              </td>
              <td index={1}>
                <text>b</text>
              </td>
            </tr>
          </table>
        </editor>
      )

      const output = (
        <editor>
          <table columns={[{ align: "left" }, { align: "left" }]}>
            <tr>
              <td index={0}>
                <text>a</text>
              </td>
              <td index={1}>
                <text>b</text>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <text>
                  a<cursor />
                </text>
              </td>
              <td index={1}>
                <text />
              </td>
            </tr>
            <tr>
              <td index={0}>
                <text />
              </td>
              <td index={1}>
                <text>2</text>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <text>a</text>
              </td>
              <td index={1}>
                <text>b</text>
              </td>
            </tr>
          </table>
        </editor>
      )

      compare(input, output, (editor) => {
        clearSelection(editor)
      })
    })
  })

  describe("clearRange", () => {
    it("should clear range across two root nodes", async () => {
      const input = (
        <editor>
          <p>
            <text>
              a<anchor />
              bc
            </text>
          </p>
          <table columns={[{ align: "left" }, { align: "left" }]}>
            <tr>
              <td index={0}>
                <text>a1</text>
              </td>
              <td index={1}>
                <text>a2</text>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <text>b1</text>
              </td>
              <td index={1}>
                <text>
                  b<focus />2
                </text>
              </td>
            </tr>
          </table>
        </editor>
      )

      const output = (
        <editor>
          <p>
            <text>
              a<cursor />
            </text>
          </p>
          <table columns={[{ align: "left" }, { align: "left" }]}>
            <tr>
              <td index={0}>
                <text></text>
              </td>
              <td index={1}>
                <text />
              </td>
            </tr>
            <tr>
              <td index={0}>
                <text />
              </td>
              <td index={1}>
                <text>2</text>
              </td>
            </tr>
          </table>
        </editor>
      )

      compare(input, output, (editor) => {
        clearSelection(editor)
      })
    })

    it("should clear across three nodes and delete the full inside node", async () => {
      const input = (
        <editor>
          <p>
            <text>
              a<anchor />
              bc
            </text>
          </p>
          <code-block language="text">
            <code-line>
              <text>abc</text>
            </code-line>
            <code-line>
              <text>def</text>
            </code-line>
          </code-block>
          <table columns={[{ align: "left" }, { align: "left" }]}>
            <tr>
              <td index={0}>
                <text>a1</text>
              </td>
              <td index={1}>
                <text>a2</text>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <text>b1</text>
              </td>
              <td index={1}>
                <text>
                  b<focus />2
                </text>
              </td>
            </tr>
          </table>
        </editor>
      )

      const output = (
        <editor>
          <p>
            <text>
              a<cursor />
            </text>
          </p>
          <table columns={[{ align: "left" }, { align: "left" }]}>
            <tr>
              <td index={0}>
                <text></text>
              </td>
              <td index={1}>
                <text />
              </td>
            </tr>
            <tr>
              <td index={0}>
                <text />
              </td>
              <td index={1}>
                <text>2</text>
              </td>
            </tr>
          </table>
        </editor>
      )

      compare(input, output, (editor) => {
        clearSelection(editor)
      })
    })
  })
})
