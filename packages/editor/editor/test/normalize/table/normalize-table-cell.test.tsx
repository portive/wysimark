/** @jsx jsx  */
import { Table } from "~/editor/table"
import { TdElement } from "~/editor/types"
import { td } from "~/lib/convert/test/util"
import { compare, jsx, normalize } from "../../test-utils"

function scaffoldTd(children: TdElement) {
  return (
    <editor>
      <table columns={[{ align: "left" }]}>
        <tr>{children}</tr>
      </table>
      <p>
        <text />
      </p>
    </editor>
  )
}

describe("normalize-table-cell", () => {
  describe("don't normalize", () => {
    it("doesn't normalize in table test", async () => {
      /**
       * The don't normalize state is checked already in `normalize-table`
       */
    })
  })
  describe("normalize parent", () => {
    it("should unwrap paragraphs when there is an invalid parent", async () => {
      const input = (
        <editor>
          <td index={0}>
            <p>
              <text>Hello World</text>
            </p>
          </td>
        </editor>
      )
      const output = (
        <editor>
          <p>
            <text>Hello World</text>
          </p>
        </editor>
      )
      normalize(input, output)
    })

    it("should unwrap anything and preserve it when there is an invalid parent", async () => {
      const input = (
        <editor>
          <td index={0}>
            <heading level={1}>Title</heading>
            <p>Hello World</p>
          </td>
        </editor>
      )
      const output = (
        <editor>
          <heading level={1}>Title</heading>
          <p>Hello World</p>
        </editor>
      )
      normalize(input, output)
    })
  })

  describe("normalize empty children", () => {
    it("should keep an empty cell", async () => {
      const input = scaffoldTd(
        <td index={0}>
          <p>
            <text />
          </p>
        </td>
      )
      const output = scaffoldTd(
        <td index={0}>
          <p>
            <text />
          </p>
        </td>
      )
      normalize(input, output)
    })
  })

  describe("normalize invalid children", () => {
    it("should keep a cell with some content", async () => {
      const input = scaffoldTd(
        <td index={0}>
          <p>
            <text>abc</text>
          </p>
        </td>
      )
      const output = scaffoldTd(
        <td index={0}>
          <p>
            <text>abc</text>
          </p>
        </td>
      )
      normalize(input, output)
    })

    it("should merge two empty paragraphs together", async () => {
      const input = scaffoldTd(
        <td index={0}>
          <p>
            <text />
          </p>
          <p>
            <text />
          </p>
        </td>
      )
      const output = scaffoldTd(
        <td index={0}>
          <p>
            <text />
          </p>
        </td>
      )
      normalize(input, output)
    })

    it("should merge two paragraphs together", async () => {
      const input = scaffoldTd(
        <td index={0}>
          <p>
            <text>abc</text>
          </p>
          <p>
            <text>def</text>
          </p>
        </td>
      )
      const output = scaffoldTd(
        <td index={0}>
          <p>
            <text>abcdef</text>
          </p>
        </td>
      )
      normalize(input, output)
    })

    it("should merge three paragraphs together", async () => {
      const input = scaffoldTd(
        <td index={0}>
          <p>
            <text>abc</text>
          </p>
          <p>
            <text>def</text>
          </p>
          <p>
            <text>ghi</text>
          </p>
        </td>
      )
      const output = scaffoldTd(
        <td index={0}>
          <p>
            <text>abcdefghi</text>
          </p>
        </td>
      )
      normalize(input, output)
    })

    it("should turn no children into an empty paragraph", async () => {
      const input = scaffoldTd(
        <td index={0}>
          <text />
        </td>
      )
      const output = scaffoldTd(
        <td index={0}>
          <p>
            <text></text>
          </p>
        </td>
      )
      normalize(input, output)
    })

    it("should convert headings into a paragraph", async () => {
      const input = scaffoldTd(
        <td index={0}>
          <heading level={1}>
            <text>abc</text>
          </heading>
          <heading level={2}>
            <text>def</text>
          </heading>
        </td>
      )
      const output = scaffoldTd(
        <td index={0}>
          <p>
            <text>abcdef</text>
          </p>
        </td>
      )
      normalize(input, output)
    })

    it("should convert nested tables", async () => {
      const input = scaffoldTd(
        <td index={0}>
          <table columns={[{ align: "left" }, { align: "left" }]}>
            <tr>
              <td index={0}>
                <heading level={1}>abc</heading>
              </td>
              <td index={1}>
                <heading level={1}>def</heading>
              </td>
            </tr>
            <tr>
              <td index={0}>
                <heading level={1}>ghi</heading>
              </td>
              <td index={1}>
                <heading level={1}>jkl</heading>
              </td>
            </tr>
          </table>
        </td>
      )
      const output = scaffoldTd(
        <td index={0}>
          <p>
            <text>abcdefghijkl</text>
          </p>
        </td>
      )
      normalize(input, output)
    })

    it("should convert nested code-blocks", async () => {
      const input = scaffoldTd(
        <td index={0}>
          <code-block language="text">
            <code-line>abc</code-line>
            <code-line>def</code-line>
          </code-block>
        </td>
      )
      const output = scaffoldTd(
        <td index={0}>
          <p>
            <text>abcdef</text>
          </p>
        </td>
      )
      normalize(input, output)
    })
  })

  describe("normalize props", () => {
    it("should reindex cells", async () => {
      const input = (
        <editor>
          <table
            columns={[
              { align: "left" },
              { align: "center" },
              { align: "right" },
            ]}
          >
            <tr>
              {td(9)}
              {td(9)}
              {td(9)}
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
              { align: "right" },
            ]}
          >
            <tr>
              {td(0)}
              {td(1)}
              {td(2)}
            </tr>
          </table>
          <p>
            <text />
          </p>
        </editor>
      )
      normalize(input, output)
    })

    it("should reindex adjacent cells when one is removed", async () => {
      const input = (
        <editor>
          <table
            columns={[
              { align: "left" },
              { align: "center" },
              { align: "right" },
            ]}
          >
            <tr>
              {td(9)}
              <td index={9}>
                <p>
                  <cursor />
                </p>
              </td>
              {td(9)}
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
              {td(0)}
              <td index={1}>
                <p>
                  <cursor />
                </p>
              </td>
            </tr>
          </table>
          <p>
            <text />
          </p>
        </editor>
      )
      compare(input, output, (editor) => {
        Table.removeColumn(editor)
      })
    })
  })
})
