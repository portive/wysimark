/** @jsx jsx  */
import { Table } from "~/editor/table"
import { compare, jsx } from "../test-utils"

describe("table", () => {
  describe("createTable", () => {
    it("should create a 3x2 table", async () => {
      const input = <editor>{Table.createTable(3, 2)}</editor>
      const output = (
        <editor>
          <table
            columns={[{ align: "left" }, { align: "left" }, { align: "left" }]}
          >
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text />
                </p>
              </td>
              <td index={2}>
                <p>
                  <text />
                </p>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text />
                </p>
              </td>
              <td index={2}>
                <p>
                  <text />
                </p>
              </td>
            </tr>
          </table>
        </editor>
      )
      expect(input.children).toEqual(output.children)
    })

    it("should create a 3x2 table with custom alignment", async () => {
      const input = (
        <editor>
          {Table.createTable(
            [{ align: "left" }, { align: "center" }, { align: "right" }],
            2
          )}
        </editor>
      )
      const output = (
        <editor>
          <table
            columns={[
              { align: "left" },
              { align: "center" },
              { align: "right" },
            ]}
          >
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text />
                </p>
              </td>
              <td index={2}>
                <p>
                  <text />
                </p>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text />
                </p>
              </td>
              <td index={2}>
                <p>
                  <text />
                </p>
              </td>
            </tr>
          </table>
        </editor>
      )
      expect(input.children).toEqual(output.children)
    })
  })

  describe("isInside", () => {
    it("should know if it's inside a table", async () => {
      const input = (
        <editor>
          <p>
            <text />
          </p>
          {Table.createTable(3, 2)}
          <p>
            <text />
          </p>
        </editor>
      )
      input.selection = {
        anchor: { path: [0, 0], offset: 0 },
        focus: { path: [0, 0], offset: 0 },
      }
      expect(Table.isInside(input)).toEqual(false)
      /**
       * This is an older test when the leafs were direct children of `td`
       * but ths method call should still work.
       */
      input.selection = {
        anchor: { path: [1, 0, 0, 0], offset: 0 },
        focus: { path: [1, 0, 0, 0], offset: 0 },
      }
      expect(Table.isInside(input)).toEqual(true)
      /**
       * This is an newer test when the paragraph is the direct child of a td
       * and the children of that are the leafs.
       */
      input.selection = {
        anchor: { path: [1, 0, 0, 0, 0], offset: 0 },
        focus: { path: [1, 0, 0, 0, 0], offset: 0 },
      }
      expect(Table.isInside(input)).toEqual(true)
      input.selection = {
        anchor: { path: [2, 0], offset: 0 },
        focus: { path: [2, 0], offset: 0 },
      }
      expect(Table.isInside(input)).toEqual(false)
    })
  })

  describe("removeTable", () => {
    it("should remove a table", async () => {
      const input = (
        <editor>
          <table columns={[{ align: "left" }]}>
            <tr>
              <td index={0}>
                <p>
                  <text>
                    <cursor />
                  </text>
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
          <p>
            <text>
              <cursor />
            </text>
          </p>
        </editor>
      )

      compare(input, output, (editor) => Table.removeTable(editor))
    })
  })

  describe("insertRow", () => {
    it("should insert a row above", async () => {
      const input = (
        <editor>
          <table
            columns={[{ align: "left" }, { align: "left" }, { align: "left" }]}
          >
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text>
                    <cursor />
                  </text>
                </p>
              </td>
              <td index={2}>
                <p>
                  <text />
                </p>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text />
                </p>
              </td>
              <td index={2}>
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
          <table
            columns={[{ align: "left" }, { align: "left" }, { align: "left" }]}
          >
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text />
                </p>
              </td>
              <td index={2}>
                <p>
                  <text />
                </p>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text>
                    <cursor />
                  </text>
                </p>
              </td>
              <td index={2}>
                <p>
                  <text />
                </p>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text />
                </p>
              </td>
              <td index={2}>
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
      compare(input, output, (editor) => Table.insertRow(editor, 0))
    })

    it("should insert a row below", async () => {
      const input = (
        <editor>
          <table
            columns={[{ align: "left" }, { align: "left" }, { align: "left" }]}
          >
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text>
                    <cursor />
                  </text>
                </p>
              </td>
              <td index={2}>
                <p>
                  <text />
                </p>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text />
                </p>
              </td>
              <td index={2}>
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
          <table
            columns={[{ align: "left" }, { align: "left" }, { align: "left" }]}
          >
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text>
                    <cursor />
                  </text>
                </p>
              </td>
              <td index={2}>
                <p>
                  <text />
                </p>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text />
                </p>
              </td>
              <td index={2}>
                <p>
                  <text />
                </p>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text />
                </p>
              </td>
              <td index={2}>
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
      compare(input, output, (editor) => Table.insertRow(editor, 1))
    })
  })

  describe("removeRow", () => {
    it("should remove a row", async () => {
      const input = (
        <editor>
          <table
            columns={[{ align: "left" }, { align: "left" }, { align: "left" }]}
          >
            <tr>
              <td index={0}>
                <p>
                  <text>a</text>
                </p>
              </td>
              <td index={1}>
                <p>
                  <text>
                    a
                    <cursor />
                  </text>
                </p>
              </td>
              <td index={2}>
                <p>
                  <text>a</text>
                </p>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <p>
                  <text>b</text>
                </p>
              </td>
              <td index={1}>
                <p>
                  <text>b</text>
                </p>
              </td>
              <td index={2}>
                <p>
                  <text>b</text>
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
          <table
            columns={[{ align: "left" }, { align: "left" }, { align: "left" }]}
          >
            <tr>
              <td index={0}>
                <p>
                  <text>b</text>
                </p>
              </td>
              <td index={1}>
                <p>
                  <text>
                    <cursor />b
                  </text>
                </p>
              </td>
              <td index={2}>
                <p>
                  <text>b</text>
                </p>
              </td>
            </tr>
          </table>
          <p>
            <text />
          </p>
        </editor>
      )
      compare(input, output, (editor) => Table.removeRow(editor))
    })

    it("should remove a table if remove a row and last row", async () => {
      const input = (
        <editor>
          <table
            columns={[{ align: "left" }, { align: "left" }, { align: "left" }]}
          >
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text>
                    <cursor />
                  </text>
                </p>
              </td>
              <td index={2}>
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
          <p>
            <text>
              <cursor />
            </text>
          </p>
        </editor>
      )
      compare(input, output, (editor) => Table.removeRow(editor))
    })
  })

  describe("insertColumn", () => {
    it("should insert a column left", async () => {
      const input = (
        <editor>
          <table
            columns={[
              { align: "left" },
              { align: "center" },
              { align: "left" },
            ]}
          >
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text>
                    <cursor />
                  </text>
                </p>
              </td>
              <td index={2}>
                <p>
                  <text />
                </p>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text />
                </p>
              </td>
              <td index={2}>
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
          <table
            columns={[
              { align: "left" },
              { align: "center" },
              { align: "center" },
              { align: "left" },
            ]}
          >
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text />
                </p>
              </td>
              <td index={2}>
                <p>
                  <text>
                    <cursor />
                  </text>
                </p>
              </td>
              <td index={3}>
                <p>
                  <text />
                </p>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text />
                </p>
              </td>
              <td index={2}>
                <p>
                  <text />
                </p>
              </td>
              <td index={3}>
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
      compare(input, output, (editor) => Table.insertColumn(editor, 0))
    })

    it("should insert a column right", async () => {
      const input = (
        <editor>
          <table
            columns={[
              { align: "left" },
              { align: "center" },
              { align: "left" },
            ]}
          >
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text>
                    <cursor />
                  </text>
                </p>
              </td>
              <td index={2}>
                <p>
                  <text />
                </p>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text />
                </p>
              </td>
              <td index={2}>
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
          <table
            columns={[
              { align: "left" },
              { align: "center" },
              { align: "center" },
              { align: "left" },
            ]}
          >
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text>
                    <cursor />
                  </text>
                </p>
              </td>
              <td index={2}>
                <p>
                  <text />
                </p>
              </td>
              <td index={3}>
                <p>
                  <text />
                </p>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text />
                </p>
              </td>
              <td index={2}>
                <p>
                  <text />
                </p>
              </td>
              <td index={3}>
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
      compare(input, output, (editor) => Table.insertColumn(editor, 1))
    })
  })
  
  describe("removeColumn", () => {
    it("remove a column", async () => {
      const input = (
        <editor>
          <table
            columns={[
              { align: "left" },
              { align: "center" },
              { align: "left" },
            ]}
          >
            <tr>
              <td index={0}>
                <p>
                  <text>a</text>
                </p>
              </td>
              <td index={1}>
                <p>
                  <text>
                    b<cursor />
                  </text>
                </p>
              </td>
              <td index={2}>
                <p>
                  <text>c</text>
                </p>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <p>
                  <text>d</text>
                </p>
              </td>
              <td index={1}>
                <p>
                  <text>e</text>
                </p>
              </td>
              <td index={2}>
                <p>
                  <text>f</text>
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
          <table columns={[{ align: "left" }, { align: "left" }]}>
            <tr>
              <td index={0}>
                <p>
                  <text>a</text>
                </p>
              </td>
              <td index={1}>
                <p>
                  <text>
                    <cursor />c
                  </text>
                </p>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <p>
                  <text>d</text>
                </p>
              </td>
              <td index={1}>
                <p>
                  <text>f</text>
                </p>
              </td>
            </tr>
          </table>
          <p>
            <text />
          </p>
        </editor>
      )
      compare(input, output, (editor) => Table.removeColumn(editor))
    })

    it("remove a table if remove last column", async () => {
      const input = (
        <editor>
          <table columns={[{ align: "left" }]}>
            <tr>
              <td index={0}>
                <p>
                  <text>
                    <cursor></cursor>
                  </text>
                </p>
              </td>
            </tr>
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
          <p>
            <text>
              <cursor />
            </text>
          </p>
        </editor>
      )
      compare(input, output, (editor) => Table.removeColumn(editor))
    })
  })

  describe("setColumnAlign", () => {
    it("should setColumnAlign", async () => {
      const input = (
        <editor>
          <table columns={[{ align: "left" }, { align: "left" }]}>
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text>
                    <cursor />
                  </text>
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
          <table columns={[{ align: "left" }, { align: "right" }]}>
            <tr>
              <td index={0}>
                <p>
                  <text />
                </p>
              </td>
              <td index={1}>
                <p>
                  <text>
                    <cursor />
                  </text>
                </p>
              </td>
            </tr>
          </table>
          <p>
            <text />
          </p>
        </editor>
      )
      compare(input, output, (editor) => Table.setColumnAlign(editor, "right"))
    })
  })
})
